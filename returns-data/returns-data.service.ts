import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReturnsData } from 'app/shared/model/returns-data.model';

type EntityResponseType = HttpResponse<IReturnsData>;
type EntityArrayResponseType = HttpResponse<IReturnsData[]>;

@Injectable({ providedIn: 'root' })
export class ReturnsDataService {
  public resourceUrl = SERVER_API_URL + 'api/returns-data';

  constructor(protected http: HttpClient) {}

  create(returnsData: IReturnsData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(returnsData);
    return this.http
      .post<IReturnsData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(returnsData: IReturnsData): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(returnsData);
    return this.http
      .put<IReturnsData>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IReturnsData>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReturnsData[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(returnsData: IReturnsData): IReturnsData {
    const copy: IReturnsData = Object.assign({}, returnsData, {
      dateOfReturn:
        returnsData.dateOfReturn && returnsData.dateOfReturn.isValid() ? returnsData.dateOfReturn.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateOfReturn = res.body.dateOfReturn ? moment(res.body.dateOfReturn) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((returnsData: IReturnsData) => {
        returnsData.dateOfReturn = returnsData.dateOfReturn ? moment(returnsData.dateOfReturn) : undefined;
      });
    }
    return res;
  }
}
