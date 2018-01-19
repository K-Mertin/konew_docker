import { Injectable } from '@angular/core';
import { DemoModel } from '../_model/demoModel';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { SpiderRequest } from '../_model/SpiderRequest';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { SpiderResult } from '../_model/SpiderResult';
import { environment } from '../../environments/environment';

@Injectable()
export class DemoServiceService {
  private demoData = '/assets/demoData.json';
  private demoRequest = '/assets/demoRequestData.json';
  constructor(private _http: HttpClient) { }

  private baseUrl = environment.apiUrl;

  getDemo(): Observable<DemoModel[]> {
    return this._http
      .get<DemoModel[]>(this.demoData);
  }

  getDemoRequest(): Observable<SpiderRequest[]> {
    return this._http
      .get<SpiderRequest[]>(this.demoRequest);
  }

  getRequestResult(requestId, pageNumber?, pageSize?, userParams?: any): Observable<SpiderResult[]> {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (userParams != null) {
      params = params.append('sortBy', userParams.sortBy);
      if (userParams.filters.length > 0) {

        userParams.filters.forEach(element => {
          params = params.append('filters', element);
        });
      }
    }


    return this._http.get<SpiderResult[]>(this.baseUrl + '/documents/' + requestId, { params });
  }

  getRequests(pageNumber?, pageSize?): Observable<SpiderRequest[]> {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return this._http.get<SpiderRequest[]>(this.baseUrl + '/requests', { params });
  }

  addRequests(requests: SpiderRequest) {
    return this._http.post(this.baseUrl + '/requests', requests, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  updateReqest(requests: SpiderRequest) {
    return this._http.put(this.baseUrl + '/requests', requests, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  removeRquest(requests: SpiderRequest) {
    return this._http.put(this.baseUrl + '/requests/delete', requests, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

}
