import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Column} from '../models/column.model';
import {filter, map, publishReplay, refCount, shareReplay, tap} from 'rxjs/operators';
import {LoadingIndicatorService} from '../../services/loading-indicator.service';

type APIResponse = {
  column: Column[],
  data: Product[],
};

@Injectable()
export class APIService {
  static readonly serviceUrl = '/assets/potato_sales.json';

  products$: Observable<Product[]>;
  columns$: Observable<Column[]>;

  constructor(http: HttpClient, indicatorService: LoadingIndicatorService) {
    const response$ = indicatorService.startObserving(http.get<APIResponse>(APIService.serviceUrl))
      .pipe(
        filter(response => !!response),
        publishReplay(),
        refCount(),
      )
    ;

    this.products$ = response$.pipe(map(response => response.data));
    this.columns$ = response$.pipe(map(response => response.column));
  }
}
