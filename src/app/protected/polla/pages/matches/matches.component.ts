import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private pollaService: PollaService
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.codTorneo = Number(this.route.snapshot.paramMap.get('codTorneo'));
    this.obtenerMatchesXTournament(this.codTorneo);
  }

  obtenerMatchesXTournament(codTorneo: number): void {
    this.pollaService.getMatchesXTorunament(codTorneo).subscribe({
      next: (data) => {
        console.log(data);
        this.matches = data;
      },
      error: (err) => this.error = err.message
    });
  }
}
