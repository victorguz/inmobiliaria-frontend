import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'proyectos',
    loadComponent: () => import('./proyectos/proyectos.component').then(m => m.ProyectosComponent)
  }
];
