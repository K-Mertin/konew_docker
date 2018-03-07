import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
// import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_model/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthUser } from '../_model/authUser';

@Injectable()
export class AuthService {
  baseUrl = environment.apiUrl;
  userToken: any;
  decodeToken: any;
  currentUser: string;
  currentRole: string;

  constructor(
    private http: HttpClient,
    private jwtHelpService: JwtHelperService
  ) {}

  login(model) {
    this.logout();
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(model.username + ':' + model.password)
    );

    return this.http
      .get<AuthUser>(this.baseUrl + '/user/login', {
        headers
      })
      .map(user => {
        // console.log(user);
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('username', user.username);
          localStorage.setItem('role', user.role);

          this.decodeToken = this.jwtHelpService.decodeToken(user.token);
          this.currentRole = user.role;
          this.currentUser = user.username;
          this.userToken = user.token;
          // console.log(
          //   this.currentRole,
          //   this.currentUser,
          //   this.decodeToken,
          //   this.userToken
          // );
        }
      })
      .catch(this.handlerError);
  }

  loggedIn() {
    const token = this.jwtHelpService.tokenGetter();

    if (!token) {
      return false;
    }

    return !this.jwtHelpService.isTokenExpired(token);
  }

  private handlerError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    const serverError = error.error;
    let modelStateErrors = '';

    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    return Observable.throw(modelStateErrors || 'Server error');
  }

  logout() {
    this.userToken = null;
    this.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
  }

  changePwd(model) {
    // console.log(this.userToken);
    return this.http
      .put(this.baseUrl + '/user/pwd', model, {
        headers: new HttpHeaders().set('x-access-token', this.userToken)
      })
      .catch(this.handlerError);
  }

  register(model) {
    // console.log(model);
    return this.http
      .post(this.baseUrl + '/user/register', model)
      .catch(this.handlerError);
  }

  getSystemSetting() {
    return this.http
      .get(this.baseUrl + '/setting/systemSetting')
      .catch(this.handlerError);
  }

  getSetting(settingName) {
    return this.http
      .get(this.baseUrl + '/setting/' + settingName)
      .catch(this.handlerError);
  }

  getSettingList() {
    return this.http
      .get(this.baseUrl + '/setting/list')
      .catch(this.handlerError);
  }

  updateSetting(settingName, key, value) {
    const model = {
      settingName: settingName,
      key: key,
      value: value
    };
    return this.http
      .put(this.baseUrl + '/setting/update', model, {
        headers: new HttpHeaders().set('x-access-token', this.userToken)
      })
      .catch(this.handlerError);
  }
}
