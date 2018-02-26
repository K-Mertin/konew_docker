import {  Component,  OnInit,  Input,  OnChanges,  ViewChild,  ElementRef} from '@angular/core';
import { SpiderRequest } from '../../_model/SpiderRequest';
import {  FormGroup,  FormBuilder,  FormControl,  Validators,  FormArray} from '@angular/forms';
import { AlertifyService } from '../../_service/alertify.service';
import { DemoServiceService } from '../../_service/demoService.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  @Input() public loadRequest: Function;
  @ViewChild('closeTag') closeTag: ElementRef;

  requestForm: FormGroup;
  requestTypes = [{ value: 'lawbank', display: '法源網' }];
  iSearchKey = '';
  iReferenceKey = '';
  request: SpiderRequest;

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService,
    private service: DemoServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('init');
    this.createRegisterForm();
  }

  createRequest() {
    this.request = Object.assign({}, this.requestForm.value);

    this.service.addRequests(this.request).subscribe(
      () => {
        this.alertify.success('requests created');
        this.createRegisterForm();
      },
      error => {
        this.alertify.error(error);
      },
      () => {
        this.loadRequest();
        this.closeTag.nativeElement.click();
      }
    );
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
