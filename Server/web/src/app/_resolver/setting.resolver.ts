import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { AuthService } from '../_service/auth.service';


@Injectable()
export class SettingResolver implements Resolve<any> {

  constructor(
    private service: AuthService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getSystemSetting().catch(error => {
      return Observable.of(null);
    });
  }
}
