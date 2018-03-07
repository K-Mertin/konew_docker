import { Component, OnInit } from '@angular/core';
import { CommonService } from '../_service/common.service';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;
  registerModel: any = {};
  roleList = [];
  allowRegister = false;

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.commonService.getRoleList().subscribe(x => {
      this.roleList = x.list;
    });

    this.authService.getSystemSetting().subscribe(x => {
      // console.log(x);
      this.allowRegister = x['register'];
    });
  }

  registerToggle() {
    this.registerMode = true;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  cancel(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  register() {
    console.log(this.registerModel);
    this.authService.register(this.registerModel).subscribe(
      x => {
        this.alertify.success('註冊成功，請使用帳號登入。');
        this.registerMode = !this.registerMode;
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
