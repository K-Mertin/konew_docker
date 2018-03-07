import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from './_service/demoService.service';
import { DemoModel } from './_model/demoModel';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'konew';

  constructor(
    private authService: AuthService,
    private jwtHelperService: JwtHelperService
  ) {
    console.log(environment.production);
    console.log(environment.apiUrl);
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (token) {
      this.authService.decodeToken = this.jwtHelperService.decodeToken(token);
      this.authService.userToken = token;
    }
    if (user) {
      this.authService.currentUser = user;
    }
    if (role) {
      this.authService.currentRole = role;
    }
  }
}
