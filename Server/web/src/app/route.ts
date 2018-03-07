import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpiderRequestComponent } from './spiders/spider-request/spider-request.component';
import { SpiderResultComponent } from './spiders/spider-result/spider-result.component';
import { SpiderHistoryComponent } from './spiders/spider-history/spider-history.component';
import { SpiderResultResolver } from './_resolver/spider-result.resolver';
import { SpiderHistoryResolver } from './_resolver/spider-history.rqsolver';
import { RelationlistComponent } from './relations/relationlist/relationlist.component';
import { RelationqueryComponent } from './relations/relationquery/relationquery.component';
import { LoancasesComponent } from './loancases/loancases.component';
import { LoancaseResolver } from './_resolver/loancase.resolver';
import { LoanstatusResolver } from './_resolver/loanStatus.resolver';
import { StatusResolver } from './_resolver/status.resolver';
import { AuthGuard } from './_guard/auth.guard';
import { SettingComponent } from './setting/setting.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'spider', component: SpiderRequestComponent },
            { path: 'spider/request', component: SpiderRequestComponent },
            { path: 'spider/result', component: SpiderResultComponent },
            { path: 'spider/result/:requestId', component: SpiderResultComponent, resolve: { results: SpiderResultResolver } },
            { path: 'spider/history', component: SpiderHistoryComponent, resolve: { requests: SpiderHistoryResolver, status: StatusResolver } },
            { path: 'relation', component: RelationlistComponent },
            { path: 'relation/query', component: RelationqueryComponent, resolve: { status: StatusResolver } },
            { path: 'setting', component: SettingComponent },
            {
                path: 'loancase', component: LoancasesComponent, resolve: {
                    loancases: LoancaseResolver, loanstatus: LoanstatusResolver
                    , status: StatusResolver
                }
            },
            { path: '**', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
