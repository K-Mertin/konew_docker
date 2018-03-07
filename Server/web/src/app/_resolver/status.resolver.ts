import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { CommonService } from '../_service/common.service';

@Injectable()
export class StatusResolver implements Resolve<any> {

  constructor(
    private service: CommonService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getStatusList().catch(error => {
      return Observable.of(null);
    });
  }
}
