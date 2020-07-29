import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReturnsData } from 'app/shared/model/returns-data.model';

@Component({
  selector: 'jhi-returns-data-detail',
  templateUrl: './returns-data-detail.component.html',
})
export class ReturnsDataDetailComponent implements OnInit {
  returnsData: IReturnsData | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ returnsData }) => (this.returnsData = returnsData));
  }

  previousState(): void {
    window.history.back();
  }
}
