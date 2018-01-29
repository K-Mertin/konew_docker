import { Injectable } from '@angular/core';
import { Relation, RELATIONS, Party } from '../_model/Relation';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class RelationService {
  constructor(private _http: HttpClient) { }

  private baseUrl = environment.apiUrl + '/relation';

  getall(): Relation[] {
    return RELATIONS;
  }

  getAutoComplete(key: string, type: string): Observable<string[]> {
    return this._http
      .get<string[]>(this.baseUrl + '/key/' + type + '/' + key);
  }

  search(key: string, type: string): Observable<Relation[]> {
    return this._http
      .get<Relation[]>(this.baseUrl + '/' + type + '/' + key);
  }

  addRelation(relation: Relation) {
    return this._http.post(this.baseUrl, relation, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/form-data')
    });
  }

  deleteRelation(id: string) {
    return this._http.delete(this.baseUrl + '/' + id);
  }

  updateRelation(relation: Relation) {
    return this._http.put(this.baseUrl, relation, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  uplodaRelation(formData: FormData) {
    return this._http.post("http://localhost:5000/api/relation/upload", formData)
      .map((response: Response) => {
        return response;
      }).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error|| 'Server error');
  }

}
