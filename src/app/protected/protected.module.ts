import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/Layout.component';
import { Bet_cockComponent } from './polla/pages/bet_cock/bet_cock.component';
import { Betting_missingComponent } from './polla/pages/betting_missing/betting_missing.component';
import { ChangePasswordComponent } from './polla/pages/change-password/change-password.component';
import { HomeComponent } from './polla/pages/home/home.component';
import { MatchesComponent } from './polla/pages/matches/matches.component';
import { See_betsComponent } from './polla/pages/see_bets/see_bets.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
    declarations: [
        LayoutComponent,
        MatchesComponent,
        HomeComponent,
        Bet_cockComponent,
        Betting_missingComponent,
        ChangePasswordComponent,
        See_betsComponent
    ],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        SharedModule,
        MaterialModule,

    ]
})
export class ProtectedModule { }
