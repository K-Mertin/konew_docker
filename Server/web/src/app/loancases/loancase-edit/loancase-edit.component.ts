import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { LoanCase } from '../../_model/LoanCase';
import { CommonService } from '../../_service/common.service';

import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/bs-moment';
import { zhCn } from 'ngx-bootstrap/locale';
import { LoancaseService } from '../../_service/loancase.service';
import { AlertifyService } from '../../_service/alertify.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-loancase-edit',
  templateUrl: './loancase-edit.component.html',
  styleUrls: ['./loancase-edit.component.css']
})
export class LoancaseEditComponent implements OnInit {
  @Input() loancaseEdit: LoanCase;
  @Input() public search: Function;
  @ViewChild('closeTag') closeTag: ElementRef;


  newState = true;

  loancaseForm: FormGroup;

  loanStatusList;

  alertMessage;

  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private _localeService: BsLocaleService,
    private service: LoancaseService,
    private alertify: AlertifyService
  ) {
    defineLocale('zh_cn', zhCn);
    this.dpConfig.containerClass = 'theme-blue';
    this.dpConfig.dateInputFormat = 'L'; // Or format like you want
    this._localeService.use('zh_cn');
  }

  ngOnInit() {
    this.createLoancaseForm();
    this.commonService
      .getLoanStatus()
      .subscribe(r => {
        this.loanStatusList = r.list;
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.loancaseEdit) {
      console.log('edit');
      this.setLoancaseForm();
      this.newState = false;
    } else {
      console.log('new');
      this.newState = true;
      this.createLoancaseForm();
    }
  }

  createLoancaseForm() {
    this.loancaseForm = this.fb.group({
      idNumber: [
        '',
        [Validators.required, Validators.minLength(8)],
        // this.validateidNumberTaken.bind(this)
      ],
      name: [
        '',
        Validators.required,
         // this.validatenameTaken.bind(this)
        ],
      status: ['new', Validators.required],
      applyDate: [null, Validators.required],
      contactor: ['', Validators.required],
      sales: ['', Validators.required],
      ticketCredit: [''],
      salesVisitDate: [null],
      lastReplyDate: [null],
      user: ['', Validators.required]
    });
  }

  setLoancaseForm() {
    this.createLoancaseForm();
    this.loancaseForm.controls['idNumber'].setValue(this.loancaseEdit.idNumber);
    this.loancaseForm.controls['name'].setValue(this.loancaseEdit.name);
    this.loancaseForm.controls['status'].setValue(this.loancaseEdit.status);
    this.loancaseForm.controls['applyDate'].setValue(
      this.loancaseEdit.applyDate
    );
    this.loancaseForm.controls['contactor'].setValue(
      this.loancaseEdit.contactor
    );
    this.loancaseForm.controls['sales'].setValue(this.loancaseEdit.sales);
    this.loancaseForm.controls['ticketCredit'].setValue(
      this.loancaseEdit.ticketCredit
    );
    this.loancaseForm.controls['salesVisitDate'].setValue(
      this.loancaseEdit.salesVisitDate
    );
    this.loancaseForm.controls['lastReplyDate'].setValue(
      this.loancaseEdit.lastReplyDate
    );
  }

  addLoancase() {
    console.log(this.loancaseForm.value);

    const loancase = Object.assign({}, this.loancaseForm.value);

    this.service.addLoancase(loancase).subscribe(
      () => {
        this.alertify.success('loancase added');
        this.createLoancaseForm();
      },
      error => {
        console.log(error.error);
        this.alertify.error(error.error);
      },
      () => {
        this.search();
        this.closeTag.nativeElement.click();
      }
    );
  }

  saveChange() {
    console.log(this.loancaseForm.value);

    this.loancaseEdit = Object.assign(
      {},
      this.loancaseEdit,
      this.loancaseForm.value
    );
    console.log(this.loancaseEdit);

    this.service.updateLoancase(this.loancaseEdit).subscribe(
      () => {
        this.alertify.success('loancase updated');
      },
      error => {
        console.log(error.error);
      },
      () => {
        this.search();
        this.closeTag.nativeElement.click();
      }
    );
  }

  delete() {
    console.log(this.loancaseForm.value);

    this.loancaseEdit = Object.assign(
      {},
      this.loancaseEdit,
      this.loancaseForm.value
    );
    console.log(this.loancaseEdit);

    this.service.deleteLoancase(this.loancaseEdit).subscribe(
      () => {
        this.alertify.success('loancase deleted');
      },
      error => {
        console.log(error.error);
      },
      () => {
        this.search();
        this.closeTag.nativeElement.click();
      }
    );
  }

  validateidNumberTaken(control: AbstractControl) {
    return this.service.checkDuplicate(control.value, 'idNumber').map(res => {
      return res > 0 ? { idNumberTaken: true } : null;
    });
  }

  validatenameTaken(control: AbstractControl) {
    return this.service.checkDuplicate(control.value, 'name').map(res => {
      return res > 0 ? { nameTaken: true } : null;
    });
  }

  checkDuplicate(evnet) {
    const value = event.target['value'];
    const name = event.target['name'];

    if ( event.target['value'].length > 0) {
      this.service
      .checkDuplicate(value, name)
      .subscribe(res => {
        this.alertMessage = res > 0 ? value + ' 已有進行中案件，請進行確認。' : null;
      });
    }
  }
}
