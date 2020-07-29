import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReturnsData } from 'app/shared/model/returns-data.model';
import { ReturnsDataService } from './returns-data.service';

@Component({
  templateUrl: './returns-data-delete-dialog.component.html',
})
export class ReturnsDataDeleteDialogComponent {
  returnsData?: IReturnsData;

  constructor(
    protected returnsDataService: ReturnsDataService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.returnsDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('returnsDataListModification');
      this.activeModal.close();
    });
  }
}
