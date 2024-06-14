import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PollaService } from '../../services/polla.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit, AfterViewInit {

  codTorneo!: number;
  matches: any[] = [];
  error: string | null = null;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';
  formMatches: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private pollaService: PollaService,
    private fb: FormBuilder
  ) {
    this.formMatches = this.fb.group({
      subMatches: this.fb.array([], [Validators.required, Validators.minLength(1)])
    });
  }

  ngAfterViewInit(): void { }

  ngOnInit(): void {
    this.codTorneo = Number(this.route.snapshot.paramMap.get('codTorneo'));

    const userString = localStorage.getItem('user');

    // Verificar si el objeto user existe en el localStorage
    if (userString) {
      const user = JSON.parse(userString);
      const codParticipante = user.codParticipante;
      this.obtenerMatchesXTournament(this.codTorneo, codParticipante);
    } else {
      console.log('Usuario no encontrado en localStorage');
    }
  }

  obtenerMatchesXTournament(codTorneo: number, codParticipante: number): void {
    this.pollaService.getMatchesXTorunament(codTorneo, codParticipante).subscribe({
      next: (data) => {
        this.matches = data;
        this.createForm();
      },
      error: (err) => this.error = err.message
    });
  }

  createForm(): void {
    const subMatchesArray = this.subMatches();
    subMatchesArray.clear(); // Limpiar el FormArray antes de agregar nuevos elementos
    this.matches.forEach(match => {
      const matchGroup = this.fb.group({
        codPartido: [match.codPartido],
        fechaActual: [match.fechaActual],
        fechaCadena: [match.fechaCadena],
        codEquipo1: [match.codEquipo1],
        equipo1: [match.equipo1],
        empate: [match.empate],
        codEquipo2: [match.codEquipo2],
        equipo2: [match.equipo2],
        jornada: [match.jornada],
        vigencia: [match.vigencia],
        apostoPor: [match.apostoPor, Validators.required]
      });
      subMatchesArray.push(matchGroup);
    });
  }

  subMatches(): FormArray {
    return this.formMatches.get('subMatches') as FormArray;
  }

  sendSingleData(index: number): void {
    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      const codParticipante = user.codParticipante;
      const matchControl = this.subMatches().at(index).value;

      this.pollaService.expire(matchControl.codPartido).pipe(
        tap(vigencia => {
          console.log(`Partido ${matchControl.codPartido} expirado response es  ====> ${vigencia}`);
        }),
        switchMap(vigencia => {
          if (vigencia === 1) {
            return this.pollaService.submitBet(codParticipante, matchControl.codPartido, matchControl.apostoPor);
          } else {
            console.log(`Partido ${matchControl.codPartido} no expirado, no se puede realizar la apuesta.`);
            this.alertMessage = `Partido ${matchControl.codPartido} no expirado, no se puede realizar la apuesta.`;
            this.alertType = 'error';
            this.showAlert();
            return of(null); // Devuelve un observable vacío
          }
        })
      ).subscribe({
        next: (response) => {
          if (response) {
            this.alertMessage = `Apuesta registrada para el partido ${matchControl.equipo1} vs ${matchControl.equipo2}`;
            this.alertType = 'success';
            this.showAlert();
            console.log(`Apuesta registrada para el partido ${matchControl.codPartido}`);
          }
        },
        error: (err) => {
          this.alertMessage = `Error registrando la apuesta para el partido ${matchControl.codPartido}: ${err.message}`;
          this.alertType = 'error';
          this.showAlert();
          console.error(`Error registrando la apuesta para el partido ${matchControl.codPartido}:`, err);
        }
      });
    }
  }

  showAlert(): void {
    setTimeout(() => {
      this.alertMessage = null;
      this.alertType = 'success';
      this.reloadMatches();
    }, 3000);
  }

  reloadMatches(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const codParticipante = user.codParticipante;
      this.obtenerMatchesXTournament(this.codTorneo, codParticipante);
    }
  }

  isPast(vigencia: string): boolean {
    return vigencia !== 'VIGENTE';
  }
}
