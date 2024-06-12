import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/Layout.component";
import { Bet_cockComponent } from "./polla/pages/bet_cock/bet_cock.component";
import { Betting_missingComponent } from "./polla/pages/betting_missing/betting_missing.component";
import { ChangePasswordComponent } from "./polla/pages/change-password/change-password.component";
import { HomeComponent } from "./polla/pages/home/home.component";
import { MatchesComponent } from "./polla/pages/matches/matches.component";
import { See_betsComponent } from "./polla/pages/see_bets/see_bets.component";



const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'matches/:codTorneo',
        component: MatchesComponent
      },
      {
        path: 'bet_cook',
        component: Bet_cockComponent
      },
      {
        path: 'see_bets',
        component: See_betsComponent
      },
      {
        path: 'betting_missing',
        component: Betting_missingComponent
      },
      {
        path: 'change_password',
        component: ChangePasswordComponent
      },
      {
        path: '**',
        redirectTo: ''
      },

    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class ProtectedRoutingModule { }
