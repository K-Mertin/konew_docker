import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SpiderRequestComponent } from './spiders/spider-request/spider-request.component';
import { SpiderResultComponent } from './spiders/spider-result/spider-result.component';
import { SpiderHistoryComponent } from './spiders/spider-history/spider-history.component';
import { SpiderResultResolver } from './_resolver/spider-result.resolver';
import { SpiderHistoryResolver } from './_resolver/spider-history.rqsolver';
import { RelationlistComponent } from './relations/relationlist/relationlist.component';
import { RelationqueryComponent } from './relations/relationquery/relationquery.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'spider', component: SpiderRequestComponent },
    { path: 'spider/request', component: SpiderRequestComponent },
    { path: 'spider/result', component: SpiderResultComponent },
    { path: 'spider/result/:requestId', component: SpiderResultComponent, resolve:{results: SpiderResultResolver } },
    { path: 'spider/history', component: SpiderHistoryComponent, resolve:{requests: SpiderHistoryResolver } },
    { path: 'relation', component: RelationlistComponent },
    { path: 'relation/query', component: RelationqueryComponent },
    // {
    //     path: '',
    //     runGuardsAndResolvers: 'always',
    //     canActivate: [AuthGuard],
    //     children: [
    //         { path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver} },
    //         { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
    //         { path: 'member/edit', component: MemberEditComponent,
    //             resolve: {user: MemberEditResolver},
    //             canDeactivate: [PreventUnsavedChanges] },
    //         { path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver} },
    //         { path: 'lists', component: ListsComponent, resolve: {users: ListsResolver} },
    //     ]
    // },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
