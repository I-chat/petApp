import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent, PetsComponent } from './components/index';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pets', component: PetsComponent },
  // otherwise redirect to login
  // TODO: should create a dashbord component that redirects to '/pets' when LoggedIn or '/login' when not
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
