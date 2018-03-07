import { Component, OnInit } from '@angular/core';
import { DemoServiceService } from '../../_service/demoService.service';
import { SpiderRequest } from '../../_model/SpiderRequest';
import { AlertifyService } from '../../_service/alertify.service';
import { Pagination } from '../../_model/pagination';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../_service/common.service';
import { AuthService } from '../../_service/auth.service';

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
  statusMap;
  rowList;

  public theBoundCallback: Function;

  constructor(
    private service: DemoServiceService,
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.demoRequest = data['requests']['data'];
      this.pagination = data['requests']['pagination'];
      this.statusMap = data['status'].map;
    });

    this.commonService.getRowList().subscribe(l => this.rowList = l);
    // this.commonService.getStatusList().subscribe(l => this.statusMap = l.map);
    this.theBoundCallback = this.loadRequests.bind(this);
    // this.loadRequests()
  }

  setEditRequest(requestEdit) {
    this.requestEdit = requestEdit;
  }

  loadRequests() {
    this.service
      .getRequests(this.pagination.pageNumber, this.pagination.pageSize)
      .subscribe(
        data => {
          this.demoRequest = data['data'];
          this.pagination = data['pagination'];
        },
        error => {
          this.alertify.error(error);
        }
      );
  }

  pageChanged(event: any): void {
    this.pagination.pageNumber = event.page;
    this.loadRequests();
  }

  deleteRequest(request) {
    if (confirm('確定要刪除?(刪除後將無法取回資料)')) {
      this.service.removeRquest(request).subscribe(
        () => {
          this.alertify.success('Deleted');
        },
        error => {
          this.alertify.error('failed to deleted');
        },
        () => {
          this.loadRequests();
        }
      );
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
