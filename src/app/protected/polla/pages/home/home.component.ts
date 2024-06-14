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



    const userString = localStorage.getItem('user');

    // Verificar si el objeto user existe en el localStorage
    if (userString) {
      const user = JSON.parse(userString);
      const codTorneo = user.codTorneo;
      this.getAllTournament(codTorneo);
    } else {
      console.log('Usuario no encontrado en localStorage');
    }



  }

  getAllTournament( codTorneo : number):void {

    this.pollaService.getAllTournaments (codTorneo).subscribe({
      next: (data) => this.tournaments = data,
      error: (err) => this.error = err.message
    });

  }


  goToTournament( codTorneo : number ):void{

    this.router.navigate(['/polla/matches', codTorneo]);

  }


  goToBeets( codTorneo : number ) :void {

    this.router.navigate(['/polla/see_bets', codTorneo]);
  }

  goToMissingBeets(  codTorneo : number ) : void {

    this.router.navigate(['/polla/betting_missing', codTorneo]);
  }


}
