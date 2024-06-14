import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollaService } from '../../services/polla.service';

@Component({
  selector: 'app-betting_missing',
  templateUrl: './betting_missing.component.html',
  styleUrls: ['./betting_missing.component.css']
})
export class Betting_missingComponent implements OnInit {

  codTorneo!: number;
  error: string | null = null;
  seeMissingBeet: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private pollaService: PollaService,
  ) { }

  ngOnInit() {
    this.codTorneo = Number(this.route.snapshot.paramMap.get('codTorneo'));
    this.obtenerBeetMissing(this.codTorneo);
  }

  obtenerBeetMissing(codTorneo: number): void {
    this.pollaService.getSeeBeetsMissing(codTorneo).subscribe({
      next: (data) => {
        this.seeMissingBeet = data;
        if (this.seeMissingBeet.length === 0) {
          console.log('No hay datos disponibles');
        }
      },
      error: (err) => this.error = err.message
    });
  }
}
