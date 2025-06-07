import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./signin/signin.component').then(m => m.SigninComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'planner',
    loadComponent: () =>
      import('./planner/planner.component').then(m => m.PlannerComponent)
  },
  {
    path: '**',
    redirectTo: 'signin'
  }
];
