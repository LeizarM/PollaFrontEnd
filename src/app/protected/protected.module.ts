import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/Layout.component';
import { AlertsComponent } from './polla/pages/alerts/alerts.component';
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
        See_betsComponent,
        AlertsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProtectedRoutingModule,
        SharedModule,
        MaterialModule,

    ],
    exports: [
      AlertsComponent
    ]
})
export class ProtectedModule { }
