import { Resolve, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertifyService } from '../_service/alertify.service';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { SpiderResult } from '../_model/SpiderResult';
import { DemoServiceService } from '../_service/demoService.service';

@Injectable()
export class SpiderResultResolver implements Resolve<SpiderResult[]> {
    pageSize = 10;
    PageNumber = 1;

    constructor(private service: DemoServiceService, private router: Router
        , private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<SpiderResult[]> {

        let requestId = route.paramMap.get('requestId');

        return this.service.getRequestResult(requestId, this.PageNumber, this.pageSize).catch(error => {
            this.alertify.error('problem retrieving data');
            this.router.navigate(['/spider/result']);
            return Observable.of(null);
        }
        )
    }

}
