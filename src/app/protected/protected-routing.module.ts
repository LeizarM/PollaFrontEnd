import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/Layout.component";
import { TournamentsComponent } from "./tournaments/tournaments.component";

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: 'tournament',
        component: TournamentsComponent
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
