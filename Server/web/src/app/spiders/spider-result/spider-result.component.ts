import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { DemoModel } from '../../_model/demoModel';
import { SpiderResult } from '../../_model/SpiderResult';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_model/pagination';
import { AlertifyService } from '../../_service/alertify.service';
import { CommonService } from '../../_service/common.service';

@Component({
  selector: 'app-spider-result',
  templateUrl: './spider-result.component.html',
  styleUrls: ['./spider-result.component.css']
})
export class SpiderResultComponent implements OnInit {
  inputtext: string;
  results: SpiderResult[];
  pagination: Pagination;
  userParams: any = {};
  rowList;
  iFilter: string;

  constructor(
    private service: DemoServiceService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.results = data['results']['data'];
      this.pagination = data['results']['pagination'];
    });

    this.commonService.getRowList().subscribe(l => this.rowList = l);
    this.userParams.sortBy = 'keys';
    this.userParams.filters = [];
  }

  loadDocuments() {
    const requestId = this.route.snapshot.paramMap.get('requestId');

    // console.log(this.userParams);

    this.service
      .getRequestResult(
        requestId,
        this.pagination.pageNumber,
        this.pagination.pageSize,
        this.userParams
      )
      .subscribe(
        data => {
          this.results = data['data'];
          this.pagination = data['pagination'];
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.loadDocuments();
  }

  addFilter() {
    if (this.iFilter.trim().length > 0) {
      this.userParams.filters.push(this.iFilter);
      this.iFilter = '';
    }
  }

  addtoFilter(filter: string) {
    this.iFilter = filter;
  }

  removeFilter(i: number) {
    this.userParams.filters.splice(i, 1);
  }

  setFilter() {
    this.loadDocuments();
    // console.log(this.userParams.filters)
  }
}
