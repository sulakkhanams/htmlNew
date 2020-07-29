import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IReturnsData, ReturnsData } from 'app/shared/model/returns-data.model';
import { ReturnsDataService } from './returns-data.service';
import { ISales } from 'app/shared/model/sales.model';
import { SalesService } from 'app/Pages/Sales/sales-details/sales.service';

@Component({
  selector: 'jhi-returns-data-update',
  templateUrl: './returns-data-update.component.html',
})
export class ReturnsDataUpdateComponent implements OnInit {
  isSaving = false;
  salescodes: ISales[] = [];
  dateOfReturnDp: any;

  editForm = this.fb.group({
    id: [],
    dateOfReturn: [],
    salesCode: [],
  });

  constructor(
    protected returnsDataService: ReturnsDataService,
    protected salesService: SalesService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ returnsData }) => {
      this.updateForm(returnsData);

      this.salesService
        .query({ filter: 'returnsdata-is-null' })
        .pipe(
          map((res: HttpResponse<ISales[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ISales[]) => {
          if (!returnsData.salesCode || !returnsData.salesCode.id) {
            this.salescodes = resBody;
          } else {
            this.salesService
              .find(returnsData.salesCode.id)
              .pipe(
                map((subRes: HttpResponse<ISales>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ISales[]) => (this.salescodes = concatRes));
          }
        });
    });
  }

  updateForm(returnsData: IReturnsData): void {
    this.editForm.patchValue({
      id: returnsData.id,
      dateOfReturn: returnsData.dateOfReturn,
      salesCode: returnsData.salesCode,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const returnsData = this.createFromForm();
    if (returnsData.id !== undefined) {
      this.subscribeToSaveResponse(this.returnsDataService.update(returnsData));
    } else {
      this.subscribeToSaveResponse(this.returnsDataService.create(returnsData));
    }
  }

  private createFromForm(): IReturnsData {
    return {
      ...new ReturnsData(),
      id: this.editForm.get(['id'])!.value,
      dateOfReturn: this.editForm.get(['dateOfReturn'])!.value,
      salesCode: this.editForm.get(['salesCode'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReturnsData>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISales): any {
    return item.id;
  }
}
