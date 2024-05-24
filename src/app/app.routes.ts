import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'venta',
    loadComponent: () =>
      import('./venta/venta.component').then((m) => m.VentaComponent),
    loadChildren: () => import('./venta/venta.routes').then((m) => m.routes),
  },
  {
    path: 'compra',
    loadComponent: () =>
      import('./compra/compra.component').then((m) => m.CompraComponent),
    loadChildren: () => import('./compra/compra.routes').then((m) => m.routes),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () => import('./auth/auth.routes').then((m) => m.routes),
  },
  {path:"",redirectTo:"auth",pathMatch:"prefix"},
  {path:"**",redirectTo:"auth",pathMatch:"prefix"},
];
