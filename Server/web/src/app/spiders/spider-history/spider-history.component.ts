import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { SpiderRequest } from '../../_model/SpiderRequest';
import { AlertifyService } from '../../_service/alertify.service';
import { Pagination } from '../../_model/pagination';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spider-history',
  templateUrl: './spider-history.component.html',
  styleUrls: ['./spider-history.component.css']
})
export class SpiderHistoryComponent implements OnInit {
  pagination: Pagination;
  userParams: any = {};
  demoRequest: SpiderRequest[];
  requestEdit: SpiderRequest;
  rowList = [{ value: 10, display: '10' }, { value: 20, display: '20' }, { value: 30, display: '30' }, { value: 50, display: '50' }, { value: 100, display: '100' }];

  public theBoundCallback: Function;


  constructor(private service: DemoServiceService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.demoRequest = data['requests']['data'];
      this.pagination = data['requests']['pagination'];
    });

    this.theBoundCallback = this.loadRequests.bind(this);
    // this.loadRequests()
  }

  setEditRequest(requestEdit) {
    this.requestEdit = requestEdit;
  }

  loadRequests() {
    this.service.getRequests(this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe(data => {
        this.demoRequest = data['data'];
        this.pagination = data['pagination'];
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.loadRequests();
  }


  deleteRequest(request) {
    if (confirm('確定要刪除?(刪除後將無法取回資料)')) {
      this.service.removeRquest(request).subscribe(() => {
        this.alertify.success('Deleted');
      }, error => {
        this.alertify.error('failed to deleted');
      }, () => {
        this.loadRequests();
      })
    }
    // this.service.removeRquest()
  }

  getRowColor(request) {
    switch (request.status) {
      case 'created':
        return 'active';
      case 'modified':
        return 'active';
      case 'finished':
        return 'success';
      case 'failed':
        return 'danger';
      case 'processing':
        return 'warning';
      default:
        return 'info';
    }

  }

}
