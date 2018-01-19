import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { SpiderResult } from '../_model/SpiderResult';
import { DemoServiceService } from '../_service/demoService.service';
import { SpiderRequest } from '../_model/SpiderRequest';

@Injectable()
export class SpiderHistoryResolver implements Resolve<SpiderRequest[]> {
    pageSize = 10;
    PageNumber = 1;

    constructor(private service: DemoServiceService, private router: Router
        , private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SpiderRequest[]> {

        return this.service.getRequests().catch(error => {
            this.alertify.error('problem retrieving data');
            this.router.navigate(['/spider/history']);
            return Observable.of(null);
        }
        )
    }

}
