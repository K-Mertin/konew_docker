import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class CommonService {
  constructor(private http: Http) {}

  getLoanStatus() {
    return this.http
      .request('./assets/loanStatus.json')
      .map(res => res.json());
  }

  getRelationType() {
    return this.http
      .request('./assets/relationType.json')
      .map(res => res.json());
  }

  getRowList() {
    return this.http
      .request('./assets/rowList.json')
      .map(res => res.json());
  }

  getStatusList() {
    return this.http
      .request('./assets/status.json')
      .map(res => res.json());
  }

  getRequestType() {
    return this.http
      .request('./assets/requestType.json')
      .map(res => res.json());
  }

  getRoleList() {
    return this.http
      .request('./assets/roleList.json')
      .map(res => res.json())
  }
}
