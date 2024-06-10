import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/Layout.component';
import { ProtectedRoutingModule } from './protected-routing.module';
import { SharedModule } from "./shared/shared.module";
import { TournamentsComponent } from './tournaments/tournaments.component';

@NgModule({
    declarations: [
        LayoutComponent,
        TournamentsComponent
    ],
    imports: [
        CommonModule,
        ProtectedRoutingModule,
        SharedModule,
        MaterialModule,

    ]
})
export class ProtectedModule { }
