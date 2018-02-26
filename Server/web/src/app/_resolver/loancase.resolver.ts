import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { SpiderResult } from '../_model/SpiderResult';
import { LoanCase } from '../_model/LoanCase';
import { LoancaseService } from '../_service/loancase.service';

@Injectable()
export class LoancaseResolver implements Resolve<LoanCase[]> {

  constructor(
    private service: LoancaseService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<LoanCase[]> {
    return this.service.getAllLoancases().catch(error => {
      this.alertify.error('problem retrieving data');
      this.router.navigate(['/loancase']);
      return Observable.of(null);
    });
  }
}
