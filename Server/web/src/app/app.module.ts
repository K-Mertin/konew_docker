import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule, ButtonsModule, BsDatepickerModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { DemoServiceService } from './_service/demoService.service';
import { HttpModule } from '@angular/http/';
import { NavComponent } from './nav/nav.component';
import { SpiderHistoryComponent } from './spiders/spider-history/spider-history.component';
import { SpiderRequestComponent } from './spiders/spider-request/spider-request.component';
import { SpiderResultComponent } from './spiders/spider-result/spider-result.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './_service/alertify.service';
import { SpiderResultResolver } from './_resolver/spider-result.resolver';
import { RequestEditComponent } from './spiders/request-edit/request-edit.component';
import { RequestCreateComponent } from './spiders/request-create/request-create.component';
import { SpiderHistoryResolver } from './_resolver/spider-history.rqsolver';
import { RelationlistComponent } from './relations/relationlist/relationlist.component';
import { RelationService } from './_service/relation.service';
import { RelationqueryComponent } from './relations/relationquery/relationquery.component';
import { RelationEditComponent } from './relations/relation-edit/relation-edit.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { LoancasesComponent } from './loancases/loancases.component';
import { LoancaseEditComponent } from './loancases/loancase-edit/loancase-edit.component';
import { CommonService } from './_service/common.service';
import { LoancaseService } from './_service/loancase.service';
import { LoancaseResolver } from './_resolver/loancase.resolver';
import { LoanstatusResolver } from './_resolver/loanStatus.resolver';
import { StatusResolver } from './_resolver/status.resolver';
import { NetworkGraphicComponent } from './relations/network-graphic/network-graphic.component';

import { NvD3Module } from 'ng2-nvd3';
import { AuthService } from './_service/auth.service';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './_guard/auth.guard';
import { SettingComponent } from './setting/setting.component';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
// this includes the core NgIdleModule but includes keepalive providers for easy wireup
import { MomentModule } from 'angular2-moment'; // optional, provides moment-style pipes for date formatting

export function getAccessToken() { return localStorage.getItem('token'); }
export const jwtConfig = {
  tokenGetter: getAccessToken,
  whitelistedDomains: ['localhost:5000']
};


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SpiderHistoryComponent,
    SpiderRequestComponent,
    SpiderResultComponent,
    HomeComponent,
    RequestEditComponent,
    RequestCreateComponent,
    RelationlistComponent,
    RelationqueryComponent,
    RelationEditComponent,
    LoancasesComponent,
    LoancaseEditComponent,
    NetworkGraphicComponent
,
    SettingComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TagInputModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    NvD3Module,
    JwtModule.forRoot({
      config: jwtConfig
    }),
    MomentModule,
    NgIdleKeepaliveModule.forRoot()
  ],
  providers: [
    DemoServiceService,
    AlertifyService,
    AuthGuard,
    SpiderResultResolver,
    SpiderHistoryResolver,
    RelationService,
    CommonService,
    LoancaseService,
    LoancaseResolver,
    LoanstatusResolver,
    StatusResolver,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
