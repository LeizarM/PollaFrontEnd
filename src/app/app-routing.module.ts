import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/auth/auth.module').then( m => m.AuthModule )
  },

  {
    path: 'polla',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),

  },
  {
    path: '**',
    redirectTo: 'auth',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot( routes,{
    useHash: true,
  } )],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

