import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollaService } from '../../services/polla.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tournaments: any[] = [];
  error: string | null = null;

  constructor(
    private router: Router,
    private pollaService : PollaService
  ) { }

  ngOnInit() {
    this.getAllTournament();
  }

  getAllTournament():void {

    this.pollaService.getAllTournaments().subscribe({
      next: (data) => this.tournaments = data,
      error: (err) => this.error = err.message
    });

  }


  goToTournament( codTorneo : number ):void{



    this.router.navigate(['/polla/matches', codTorneo]);

  }

}
