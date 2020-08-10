import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ErrorService {
  errors$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  hasError$: Observable<boolean> = this.errors$.pipe(map(message => !!message));

  constructor() {

  }

  catch(error: string) {
    this.errors$.next(this.errors$.value.concat([error]));
  }
}
