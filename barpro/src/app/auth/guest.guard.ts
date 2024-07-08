import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanActivateChild {
  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.authSvc.syncIsLoggedIn) {
      return true;
    }

    // Se l'utente è loggato, decidiamo dove reindirizzare in base al suo ruolo
    if (this.authSvc.isUser()) {
      this.router.navigate(['/user-profile']);
      return false;
    }

    if (this.authSvc.isBarman()) {
      this.router.navigate(['/barman-profile']);
      return false;
    }

    // Caso di fallback, reindirizziamo alla home
    this.router.navigate(['/']);
    return false;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
