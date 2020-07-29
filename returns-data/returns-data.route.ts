import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IReturnsData, ReturnsData } from 'app/shared/model/returns-data.model';
import { ReturnsDataService } from './returns-data.service';
import { ReturnsDataComponent } from './returns-data.component';
import { ReturnsDataDetailComponent } from './returns-data-detail.component';
import { ReturnsDataUpdateComponent } from './returns-data-update.component';

@Injectable({ providedIn: 'root' })
export class ReturnsDataResolve implements Resolve<IReturnsData> {
  constructor(private service: ReturnsDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IReturnsData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((returnsData: HttpResponse<ReturnsData>) => {
          if (returnsData.body) {
            return of(returnsData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ReturnsData());
  }
}

export const returnsDataRoute: Routes = [
  {
    path: '',
    component: ReturnsDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnsData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ReturnsDataDetailComponent,
    resolve: {
      returnsData: ReturnsDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnsData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ReturnsDataUpdateComponent,
    resolve: {
      returnsData: ReturnsDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnsData',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ReturnsDataUpdateComponent,
    resolve: {
      returnsData: ReturnsDataResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ReturnsData',
    },
    canActivate: [UserRouteAccessService],
  },
];
