import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IReturnsData } from 'app/shared/model/returns-data.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ReturnsDataService } from './returns-data.service';
import { ReturnsDataDeleteDialogComponent } from './returns-data-delete-dialog.component';

@Component({
  selector: 'jhi-returns-data',
  templateUrl: './returns-data.component.html',
})
export class ReturnsDataComponent implements OnInit, OnDestroy {
  returnsData: IReturnsData[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected returnsDataService: ReturnsDataService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.returnsData = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.returnsDataService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IReturnsData[]>) => this.paginateReturnsData(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.returnsData = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  search() : void{
    if((this.itemName === '' this.itemName.length === 0) && (this.code === '' || this.code.length === 0 )){
      this.inventoryService.query().subscripe( next: (res: HttpResponse<IInventory[]>) => (this.searchItems = res.body||[]));
    }else if(this.itemName === '' || this.itemName.length === 0 ) {
      this.inventoryService.findAllByCode(this.code).subscribe( next: (res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    }else (this.code === '' || this.code.length === 0 ){
      this.inventoryService.findAllByDate(this.code).subscribe( next: (res: HttpResponse<IInventory[]>) => (this.searchItems = res.body || []));
    }
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInReturnsData();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IReturnsData): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInReturnsData(): void {
    this.eventSubscriber = this.eventManager.subscribe('returnsDataListModification', () => this.reset());
  }

  delete(returnsData: IReturnsData): void {
    const modalRef = this.modalService.open(ReturnsDataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.returnsData = returnsData;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateReturnsData(data: IReturnsData[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.returnsData.push(data[i]);
      }
    }
  }
}
