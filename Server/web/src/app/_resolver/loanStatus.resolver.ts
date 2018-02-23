import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { CommonService } from '../_service/common.service';

@Injectable()
export class LoanstatusResolver implements Resolve<any> {

  constructor(
    private service: CommonService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.service.getLoanStatus().catch(error => {
      this.router.navigate(['/loancase']);
      return Observable.of(null);
    });
  }
}
