import {ChangeDetectionStrategy, Component} from '@angular/core';
import {APIService} from '../../../shared/api/services/api.service';
import {map} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {Product} from '../../../shared/api/models/product.model';
import {FormBuilder, FormControl} from '@angular/forms';

export type SaleWithTotals = Product | { total: number };

@Component({
  selector: 'app-products-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  values$: Observable<SaleWithTotals[]>;
  search: FormControl;

  private totals: {
    [k in (keyof Product | 'total')]?: Observable<any>;
  } = {};

  constructor(public apiService: APIService, builder: FormBuilder) {
    this.search = builder.control(null);

    const values$ = apiService.products$
      .pipe(
        map(products => products.map(productSale => <SaleWithTotals> {
            ...productSale,
            total: Object.keys(productSale)
              .filter(k => k.startsWith('salesQ'))
              .reduce((sum, k) => sum + parseFloat(productSale[k].toString()), 0),
          })
        ),
      )
    ;

    // SEEME: valueChanges does not fire until a key is pressed
    // Workaround: use a Subject as a subscriber for valueChanges, but with the advantage of providing an initial value
    const valueChangeSubject$ = new BehaviorSubject<string>('');
    this.search.valueChanges.subscribe(quickFilter => valueChangeSubject$.next(quickFilter));
    this.values$ = combineLatest([valueChangeSubject$, values$])
      .pipe(
        map(([quickFilter, values]) => values.filter(sale =>
          Object.keys(sale)
            .filter(k => sale[k].toString().toLowerCase().includes(quickFilter.toLowerCase()))
            .length > 0)),
      )
    ;
    ['salesQ1', 'salesQ2', 'salesQ3', 'salesQ4', 'total'].forEach(field => {
      this.totals[field] = this.values$
        .pipe(
          map(values => values.map(v => <number> v[field]).reduce((sum, v) => sum + parseFloat(v.toString()), 0)),
        )
      ;
    });
  }

  getTotal$(column): Observable<number> {
    const field = column.field || 'total';

    return this.totals[field];
  }
}
