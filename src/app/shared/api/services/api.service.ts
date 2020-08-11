import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Column} from '../models/column.model';
import {filter, map, publishReplay, refCount, tap} from 'rxjs/operators';
import {LoadingIndicatorService} from '../../services/loading-indicator.service';

type APIResponse = {
  column: Column[],
  data: Product[],
};

@Injectable()
export class APIService {
  static readonly serviceUrl = '/assets/potato_sales.json';

  response$: Observable<APIResponse>;
  productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  columnsSubject$: BehaviorSubject<Column[]> = new BehaviorSubject<Column[]>([]);
  columnsWithSubColumns$: Observable<Column[]>;
  valueColumns$: Observable<Column[]>;
  numberColumns$: Observable<Column[]>;

  private loaded = false;

  constructor(http: HttpClient, private indicatorService: LoadingIndicatorService) {
    this.response$ = indicatorService.startObserving(http.get<APIResponse>(APIService.serviceUrl))
      .pipe(
        filter(response => !!response),
        publishReplay(),
        refCount(),
        tap(() => this.loaded = true),
      )
    ;

    this.columnsWithSubColumns$ = this.columnsSubject$
      .pipe(
        map(columns => columns.reduce((subColumns, column) => subColumns.concat(...(column.subHeaders || [])), [])),
      );
    this.numberColumns$ = this.columnsWithSubColumns$
      .pipe(map(columns => columns.concat([<Column> {field: 'total', header: 'Total'}])));
    this.valueColumns$ = this.columnsSubject$
      .pipe(
        map(columns => columns.reduce((valueColumns, column) =>
          valueColumns.concat(...(column.subHeaders || [column])), [])),
      );
  }

  get products$(): BehaviorSubject<Product[]> {
    this.load();
    return this.productsSubject$;
  }

  get columns$(): BehaviorSubject<Column[]> {
    this.load();
    return this.columnsSubject$;
  }

  get(id: string): Observable<Product> {
    return this.products$
      .pipe(
        map(products => products.find(p => p.productID === id)),
      )
      ;
  }

  save(sale: Product): Observable<Product> {
    if (!sale.productID) {
      sale.productID = Math.floor(Math.random() * 1e13).toString();
      this.products$.next(this.products$.value.concat([sale]));
    } else {
      this.products$.next(this.products$.value.map(p => p.productID === sale.productID ? sale : p));
    }

    return this.products$.pipe(
      map(products => products.filter(p => p.productID === sale.productID)),
      filter(products => !!products),
      map(products => products.shift()),
    );
  }

  isNumberColumn(column: Column): boolean {
    return !column.field
      || column.field.startsWith('salesQ')
      || column.field === 'productID'
      ;
  }

  private load() {
    if (!this.loaded) {
      this.response$.subscribe(response => {
        this.productsSubject$.next(response.data);
        this.columnsSubject$.next(response.column);
      });
    }
  }
}
