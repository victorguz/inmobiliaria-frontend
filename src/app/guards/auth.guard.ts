import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.isAuthenticated()) {
    auth.logout();
    return false;
  }

  if (!arrayNotEmpty(AuthService.companies)) {
    router.navigate([AuthService.ROUTE_ON_NOT_COMPANY]);
    return false;
  }

  if (!arrayNotEmpty(AuthService.agencies)) {
    AuthService.showCompanyAndAgencySelectorDialog();
    router.navigate([AuthService.ROUTE_ON_NOT_AGENCY]);
    return false;
  }

  /**  Cambiar el token del usuario para
   *   uno que tenga la compañia y la agencia
   **/

  if (
    !AuthService.currentUser.companyId &&
    arrayNotEmpty(AuthService.companies)
  ) {
    const spinnerId = showLoadingSpinner();
    // selecciono por defecto la primera compañia
    console.log('cambiado');
    auth.selectCompany().subscribe((result) => {
      if (result) hideLoadingSpinner(spinnerId);
    });
  }

  return true;
};
