import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule, ButtonsModule } from 'ngx-bootstrap';

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
import { AlertifyService } from './_service/alertify.service'
import { SpiderResultResolver } from './_resolver/spider-result.resolver';
import { RequestEditComponent } from './spiders/request-edit/request-edit.component';
import { RequestCreateComponent } from './spiders/request-create/request-create.component';
import { SpiderHistoryResolver } from './_resolver/spider-history.rqsolver';
import { RelationlistComponent } from './relations/relationlist/relationlist.component';
import { RelationService } from './_service/relation.service';
import { RelationqueryComponent } from './relations/relationquery/relationquery.component';
import { RelationEditComponent } from './relations/relation-edit/relation-edit.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';


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
    RelationEditComponent
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
    AngularMultiSelectModule
  ],
  providers: [
    DemoServiceService,
    AlertifyService,
    SpiderResultResolver,
    SpiderHistoryResolver,
    RelationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
