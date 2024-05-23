import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'estadisticas',
    loadComponent: () => import('./estadisticas/estadisticas.component').then(m => m.EstadisticasComponent)
  }
];
