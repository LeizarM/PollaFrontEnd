import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollaService } from '../../services/polla.service';

@Component({
  selector: 'app-see_bets',
  templateUrl: './see_bets.component.html',
  styleUrls: ['./see_bets.component.css']
})
export class See_betsComponent implements OnInit {

  codTorneo!: number;
  error: string | null = null;
  seeBeet: any[] = [];
  jornadas: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private pollaService: PollaService,
  ) { }

  ngOnInit() {
    this.codTorneo = Number(this.route.snapshot.paramMap.get('codTorneo'));
    this.obtenerBeet(this.codTorneo);
  }

  obtenerBeet(codTorneo: number): void {
    this.pollaService.getSeeBeets(codTorneo).subscribe({
      next: (data) => {
        this.seeBeet = data;
        this.setJornadas();
        console.log(this.seeBeet);
      },
      error: (err) => this.error = err.message
    });
  }

  setJornadas(): void {
    if (this.seeBeet.length > 0) {
      this.jornadas = Object.keys(this.seeBeet[0])
        .filter(key => !isNaN(Number(key)))
        .map(Number);
    }
  }
}
