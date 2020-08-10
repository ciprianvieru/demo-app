import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {APIService} from '../../../shared/api/services/api.service';
import {Product} from '../../../shared/api/models/product.model';
import {ModelFactory} from '../../../shared/api/models/model-factory';
import {ModelForm} from '../../../shared/models/model-form.model';
import {EntityMode} from '../../../shared/models/entity-mode.model';
import {Column} from '../../../shared/api/models/column.model';

@Component({
  selector: 'app-edit',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  sale$: Observable<Product>;
  mode$: Observable<EntityMode>;
  columns$: Observable<Column[]>;
  isReadonly$: Observable<boolean>;
  saving$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  saved$: Observable<Product>;
  form: FormGroup;

  private params$: Observable<any>;

  constructor(public apiService: APIService,
              builder: FormBuilder,
              route: ActivatedRoute,
              router: Router) {
    const formSubject = new BehaviorSubject<Product>(null);

    this.params$ = combineLatest([route.data, route.params])
      .pipe(
        map(([data, params]) => <any> { ...data, ...params }),
      )
    ;
    this.mode$ = this.params$.pipe(map(params => params.mode || EntityMode.VIEW));
    this.isReadonly$ = this.mode$.pipe(map(mode => mode !== EntityMode.ADD && mode !== EntityMode.VIEW));

    this.sale$ = this.params$
      .pipe(
        map(params => params.productID),
        distinctUntilChanged(),
        switchMap(id => apiService.get(id)),
        map(product => product || ModelFactory.createProduct()),
        tap(product => {
          if (!this.form) {
            debugger;
            this.form = builder.group(this.buildModelForm(product));
            this.form.valueChanges.subscribe(p => {
              formSubject.next(p);
              this.saving$.next(false);
            });
            this.saved$ = combineLatest([this.saving$, formSubject])
              .pipe(
                filter(([saving]) => saving && this.form.valid),
                map(([, sale]) => sale),
                switchMap(sale => apiService.save(sale)),
                tap(() => this.saving$.next(false)),
                tap((saved) => !!saved && router.navigate(['sales'])),
              )
            ;
          }
        }),
      )
    ;

    this.columns$ = combineLatest([apiService.columns$, this.sale$])
      .pipe(
        map(([columns, sale]) =>
          Object.keys(sale).map(k => columns.find(c => c.field === k) || <Column> {
            field: k,
            header: k,
          })),
      )
    ;
  }

  ngOnInit(): void {
  }

  private buildModelForm(product: Product): ModelForm<Product> {
    return Object.keys(product)
      .map((k: keyof Product) => [k, [product[k], k !== 'productID' ? [Validators.required] : []]])
      .reduce((controls: ModelForm<Product>, [k, controlSpec]: [string, any]) => <ModelForm<Product>> {
        ...controls,
        [k]: controlSpec,
      }, <ModelForm<Product>> {})
    ;
  }
}
