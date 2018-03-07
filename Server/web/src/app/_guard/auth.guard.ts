import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authSerive: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSerive.loggedIn()) {
      return true;
    }

    this.alertify.error('needed to log in');
    this.router.navigate(['/home']);
    return false;
  }
}
