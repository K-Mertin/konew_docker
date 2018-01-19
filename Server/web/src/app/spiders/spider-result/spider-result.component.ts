import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { DemoModel } from '../../_model/demoModel';
import { SpiderResult } from '../../_model/SpiderResult';
import { Router, ActivatedRoute } from '@angular/router'
import { Pagination, PaginatedResult } from '../../_model/pagination';
import { AlertifyService } from '../../_service/alertify.service';

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
  rowList=  [{ value: 10, display: '10' }, { value: 20, display: '20'}, { value: 30, display: '30'}, { value: 50, display: '50'}, { value: 100, display: '100'}];
  iFilter:string;


  constructor(private service: DemoServiceService, private route: ActivatedRoute, private alertify: AlertifyService) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.results = data['results']['data'];
      this.pagination = data['results']['pagination'];
    });

    this.userParams.sortBy = 'keys';
    this.userParams.filters = [];
  }

  loadDocuments() {
    let requestId = this.route.snapshot.paramMap.get('requestId');

    // console.log(this.userParams);

    this.service.getRequestResult(requestId,this.pagination.pageNumber, this.pagination.pageSize, this.userParams)
      .subscribe( data => {
        this.results = data['data'];
        this.pagination = data['pagination'];
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.loadDocuments();
  }

  addFilter() {
    if(this.iFilter.trim().length > 0){
      this.userParams.filters.push(this.iFilter)
      this.iFilter =''
    }
  }

  addtoFilter(filter:string) {
    this.iFilter = filter
  }

  removeFilter(i: number) {
    this.userParams.filters.splice(i, 1);
  }

  setFilter() {
    this.loadDocuments()
    // console.log(this.userParams.filters)
  }
  

}
