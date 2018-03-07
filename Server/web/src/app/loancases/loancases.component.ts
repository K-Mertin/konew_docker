import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoanCase } from '../_model/LoanCase';
import { LoancaseService } from '../_service/loancase.service';
import { AlertifyService } from '../_service/alertify.service';
import { Pagination } from '../_model/pagination';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../_service/common.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-loancases',
  templateUrl: './loancases.component.html',
  styleUrls: ['./loancases.component.css']
})
export class LoancasesComponent implements OnInit {
  @ViewChild('input') input: ElementRef;
  loancases: LoanCase[];
  queryType: string;
  queryKey: string;
  loancaseEdit: LoanCase;
  loancaseHist;

  pagination: Pagination;
  userParams: any = {};
  rowList;
  keylist = [];
  subscription: Subscription[];
  loanStatusMap;
  statusMap;

  public theBoundCallback: Function;

  constructor(
    private service: LoancaseService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.queryType = 'idNumber';
    this.queryKey = '';
    this.route.data.subscribe(data => {
      this.loancases = data['loancases']['data'];
      this.pagination = data['loancases']['pagination'];
      this.loanStatusMap = data['loanstatus'].map;
      this.statusMap = data['status'].map;
    });

    this.theBoundCallback = this.search.bind(this);
    this.commonService.getRowList().subscribe(l => this.rowList = l);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.subscription = [this.filterEnterEvent(), this.filterKeyupEvent()];
  }

  filterEnterEvent() {
    return Observable.fromEvent(this.input.nativeElement, 'input')
      .filter(e => e['target'].value.length > 0)
      .do(v => (this.keylist = []))
      .debounceTime(500)
      .switchMap(e =>
        this.service.getAutoComplete(e['target'].value, this.queryType)
      )
      .subscribe(p => {
        this.keylist = this.keylist.concat(p);
      });
  }

  filterKeyupEvent() {
    return Observable.fromEvent(this.input.nativeElement, 'keyup')
      .filter(e => e['target'].value === '')
      .subscribe(() => {
        this.keylist = [];
      });
  }

  search() {
    console.log('search');
    this.service.getLoancases(this.queryType, this.queryKey, this.pagination.pageNumber, this.pagination.pageSize)
    .subscribe(
      data => {
        this.loancases = data['data'];
        this.pagination = data['pagination'];
        console.log(data);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  setEditLoancase(loancaseEdit) {
    this.loancaseEdit = loancaseEdit;
  }
  resetEditLoancase() {
    this.loancaseEdit = null;
  }

  getHistLoancase(id) {
    this.service.getHistLoancase(id)
      .subscribe( data => {
        this.loancaseHist = data;
      }
      );
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.search();
  }
}
