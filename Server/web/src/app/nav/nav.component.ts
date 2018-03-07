import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';
import { CommonService } from '../_service/common.service';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  pwdModel: any = {};
  roleMap = [];

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  constructor(
    private idle: Idle,
    private keepalive: Keepalive,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private commonService: CommonService
  ) {
    this.authService.getSystemSetting().subscribe(x => {
      // console.log(parseInt(x['idleTime'], 10));
      // console.log(parseInt(x['idleTimeout'], 10));
      idle.setIdle(parseInt(x['idleTime'], 10));
      idle.setTimeout(parseInt(x['idleTimeout'], 10));
    });
    // sets an idle timeout of 5 seconds, for testing purposes.
    // idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    // idle.setTimeout(120);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => (this.idleState = ''));
    idle.onTimeout.subscribe(() => {
      this.logout();
      this.idleState = '閒置過長，請重新登入';
      this.timedOut = true;
    });
    // idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));
    idle.onTimeoutWarning.subscribe(
      countdown =>
        (this.idleState = '閒置過長，將在 ' + countdown + ' 秒後登出!')
    );

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    // keepalive.onPing.subscribe(() => (this.lastPing = new Date()));

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = '';
    this.timedOut = false;
  }

  ngOnInit() {
    console.log('init');
    this.commonService.getRoleList().subscribe(x => {
      this.roleMap = x.map;
    });
  }

  login() {
    console.log('asdf');
    this.authService.login(this.model).subscribe(
      x => {
        this.alertify.success('logged in successfully');
        this.reset();
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }

  changePwd() {
    this.authService.changePwd(this.pwdModel).subscribe(
      x => {
        this.alertify.success('change successfully');
      },
      error => {
        if (error) {
          this.alertify.error(error);
        } else {
          this.alertify.error('failed');
        }
      }
    );
  }
}
