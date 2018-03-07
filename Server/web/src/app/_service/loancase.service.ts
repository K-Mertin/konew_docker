import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { LoanCase } from '../_model/LoanCase';

@Injectable()
export class LoancaseService {
  constructor(private _http: HttpClient) {}

  private baseUrl = environment.apiUrl + '/loancases';

  search(key: string, type: string): Observable<LoanCase[]> {
    return this._http.get<LoanCase[]>(this.baseUrl + '/' + type + '/' + key);
  }

  addLoancase(loancase: LoanCase) {
    // console.log(loancase);

    return this._http.post(this.baseUrl + '/add', loancase, {
      headers: new HttpHeaders().set('Content-Type', 'application/form-data')
    });
  }

  getAllLoancases (pageNumber?, pageSize?): Observable<LoanCase[]> {
    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return this._http.get<LoanCase[]>(this.baseUrl + '/list', { params });
  }

  getLoancases (type: string, key: string, pageNumber?, pageSize?): Observable<LoanCase[]> {
    if (key === '') {
      return this.getAllLoancases(pageNumber, pageSize);
    }

    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    return this._http.get<LoanCase[]>(this.baseUrl + '/' + type + '/' + key , { params });
  }

  updateLoancase(loancase: LoanCase) {
    return this._http.put(this.baseUrl + '/update', loancase, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  deleteLoancase(loancase: LoanCase) {
    return this._http.put(this.baseUrl + '/delete', loancase, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  getAutoComplete(key: string, type: string): Observable<string[]> {
    return this._http.get<string[]>(this.baseUrl + '/key/' + type + '/' + key);
  }

  checkDuplicate(key: string, type: string): Observable<number> {
    return this._http.get<number>(this.baseUrl + '/check/' + type + '/' + key);
  }

  getHistLoancase(id: string) {
    return this._http.get<number>(this.baseUrl + '/log/' + id);
  }
}
