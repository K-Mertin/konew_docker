import { Component, OnInit, Input, OnChanges,ViewChild, ElementRef } from '@angular/core';
import { SpiderRequest } from '../../_model/SpiderRequest';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { DemoServiceService } from '../../_service/demoService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit, OnChanges {
  @Input() requestEdit: SpiderRequest
  @Input() public loadRequest: Function 
  @ViewChild('closeTag') closeTag: ElementRef

  requestForm: FormGroup;
  requestTypes = [{ value: 'lawbank', display: '需求種類' }];
  iSearchKey = '';
  iReferenceKey = '';
  // request: SpiderRequest;

  constructor(private fb: FormBuilder, private alertify: AlertifyService, private service: DemoServiceService, private router: Router) { }

  ngOnInit() {
    // console.log('init')
    this.createRegisterForm();
  }
  ngOnChanges() {
    // console.log('changes');
    if (this.requestEdit) {
      this.setRequestForm();
    }

  }

  // submit() {
  //   this.request = Object.assign({}, this.requestForm.value);

  //   this.service.addRequests(this.request).subscribe(() => {
  //     this.alertify.success('requests created')
  //     this.createRegisterForm()

  //   }, error => {
  //     console.log(error);
  //   });
  // }

  setRequestForm() {
    this.createRegisterForm();
    // tslint:disable-next-line:forin
    for (let key in this.requestEdit['searchKeys']) {
      (<FormArray>this.requestForm.controls['searchKeys']).push(new FormControl(this.requestEdit['searchKeys'][key]));
    }
    // tslint:disable-next-line:forin
    for (let key in this.requestEdit['referenceKeys']) {
      (<FormArray>this.requestForm.controls['referenceKeys']).push(new FormControl(this.requestEdit['referenceKeys'][key]));
    }
    // console.log(this.requestEdit.requestType)
    this.requestForm.controls['requestType'].setValue('lawbank');
  }

  createRegisterForm() {
    this.requestForm = this.fb.group({
      requestType: ['lawbank', Validators.required],
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

  // addSearchKey() {
  //   while (this.iSearchKey.trim().length > 0) {
  //     const control = <FormArray>this.requestForm.controls['searchKeys'];
  //     control.push(new FormControl(this.iSearchKey));
  //     this.iSearchKey = '';
  //   }
  // }

  // removeSearchKey(i: number) {
  //   const control = <FormArray>this.requestForm.controls['searchKeys'];
  //   control.removeAt(i);
  // }

  addReferenceKey() {
    while (this.iReferenceKey.trim().length > 0) {
      const control = <FormArray>this.requestForm.controls['referenceKeys'];
      control.push(new FormControl(this.iReferenceKey));
      this.requestEdit['referenceKeys']=control.value;
      this.iReferenceKey = '';
    }

  }

  removeReferenceKey(i: number) {
    const control = <FormArray>this.requestForm.controls['referenceKeys'];
    control.removeAt(i);
    this.requestEdit['referenceKeys']=control.value;
  }

  saveChange() {
    // this.requestEdit = Object.assign({}, this.requestForm.value);
    // console.log(this.requestEdit)
    this.service.updateReqest(this.requestEdit).subscribe(() => {
      this.alertify.success('requests updated')
    }, error => {
      console.log(error);
    },() => {
      this.loadRequest();
      this.closeTag.nativeElement.click();
    } );

  }
}
