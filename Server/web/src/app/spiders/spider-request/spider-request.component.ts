import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl
} from '@angular/forms';
import { SpiderRequest } from '../../_model/SpiderRequest';
import { DemoServiceService } from '../../_service/demoService.service';
import { AlertifyService } from '../../_service/alertify.service';

@Component({
  selector: 'app-spider-request',
  templateUrl: './spider-request.component.html',
  styleUrls: ['./spider-request.component.css']
})
export class SpiderRequestComponent implements OnInit {
  @Input() public loadRequest: Function;

  requestForm: FormGroup;
  requestTypes = [{ value: 'lawbank', display: '法源網' }];
  iSearchKey = '';
  iReferenceKey = '';
  request: SpiderRequest;

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private service: DemoServiceService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  submit() {
    this.request = Object.assign({}, this.requestForm.value);

    this.service.addRequests(this.request).subscribe(
      () => {
        this.alertify.success('requests created');
        this.createRegisterForm();
      },
      error => {
        console.log(error);
      }
    );
  }

  createRegisterForm() {
    this.requestForm = this.fb.group({
      requestType: ['lawbank'],
      searchKeys: this.fb.array([new FormControl()]),
      referenceKeys: this.fb.array([new FormControl()]),
      requester: ['', Validators.required],
      requestStatus: ['', Validators.required]
    });

    let control = <FormArray>this.requestForm.controls['searchKeys'];
    control.removeAt(0);
    control = <FormArray>this.requestForm.controls['referenceKeys'];
    control.removeAt(0);
  }

  addSearchKey() {
    while (this.iSearchKey.trim().length > 0) {
      const control = <FormArray>this.requestForm.controls['searchKeys'];
      control.push(new FormControl(this.iSearchKey));
      this.iSearchKey = '';
    }
  }

  removeSearchKey(i: number) {
    const control = <FormArray>this.requestForm.controls['searchKeys'];
    control.removeAt(i);
  }

  addReferenceKey() {
    while (this.iReferenceKey.trim().length > 0) {
      const control = <FormArray>this.requestForm.controls['referenceKeys'];
      control.push(new FormControl(this.iReferenceKey));
      this.iReferenceKey = '';
    }
  }

  removeReferenceKey(i: number) {
    const control = <FormArray>this.requestForm.controls['referenceKeys'];
    control.removeAt(i);
  }
}
