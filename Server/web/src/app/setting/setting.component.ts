import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  
  settingList = [];
  setting: any;
  settingKeys = [];

  constructor(private authService: AuthService, private alertify: AlertifyService) {}

  ngOnInit() {
    this.authService.getSettingList().subscribe( x => {
      this.settingList = x;
      this.getSetting(this.settingList[0])
    })
  }

  refreshSetting(event) {
    const settingName = event.target.value;
    this.getSetting(settingName);
  }

  getSetting(settingName) {
    this.authService.getSetting(settingName).subscribe(x => {
      this.setting = x
      this.settingKeys=Object.keys(this.setting);
    })
  }

  updateSetting(event, settingName, key) {
    console.log(settingName, key, event.target.value)
    this.authService.updateSetting(settingName,key,event.target.value).subscribe(x => {
      this.alertify.success('update successfully');
    }, error => {
      if (error) {
        this.alertify.error(error);
      } else {
        this.alertify.error('failed');
      }
    });
  }

  insertSettingPara(settingName,key , value ) {
    console.log(settingName, key, value)
    this.authService.updateSetting(settingName,key, value).subscribe(x => {
      this.alertify.success('insert successfully');
      this.getSetting(settingName)
    }, error => {
      if (error) {
        this.alertify.error(error);
      } else {
        this.alertify.error('failed');
      }
    });
  }

}
