import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
      // Parsear el JSON string a un objeto
      const user = JSON.parse(userString);

      // Acceder a la propiedad codParticipante
      const codParticipante = user.codParticipante;

      // Hacer algo con el codParticipante, por ejemplo, imprimirlo en consola
      this.obtenerMatchesXTournament(this.codTorneo, codParticipante);
    } else {
      // Manejar el caso en el que el objeto user no esté en el localStorage
      console.log('Usuario no encontrado en localStorage');
    }




  }

  obtenerMatchesXTournament(codTorneo: number, codParticipante: number): void {
    this.pollaService.getMatchesXTorunament(codTorneo, codParticipante).subscribe({
      next: (data) => {
        console.log(data);
        this.matches = data;
        this.createForm();
      },
      error: (err) => this.error = err.message
    });
  }

  createForm(): void {
    const subMatchesArray = this.formMatches.get('subMatches') as FormArray;
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

  sendData(): void {
    const userString = localStorage.getItem('user');

    // Verificar si el objeto user existe en el localStorage
    if (userString) {
      // Parsear el JSON string a un objeto
      const user = JSON.parse(userString);

      // Acceder a la propiedad codParticipante
      const codParticipante = user.codParticipante;
      const formValues = this.formMatches.value.subMatches;
      formValues.forEach((match: any) => {
        console.log(`Partido ${match.codPartido}: Selección - ${match.apostoPor}`);
        this.pollaService.submitBet(codParticipante, match.codPartido, match.apostoPor).subscribe({
          next: (response) => {
            console.log(`Apuesta registrada para el partido ${match.codPartido}`);
          },
          error: (err) => {
            console.error(`Error registrando la apuesta para el partido ${match.codPartido}:`, err);
          }
        });
      });

    }



  }


  isPast(vigencia: string): boolean {
    return vigencia !== 'VIGENTE';
  }



}
