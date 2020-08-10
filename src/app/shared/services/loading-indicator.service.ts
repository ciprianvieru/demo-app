import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {LoadingIndicator} from '../models/loading-indicators.model';
import {ErrorService} from './error.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class LoadingIndicatorService {
    indicator = new LoadingIndicator();

    constructor(private errorService: ErrorService) { }

    startLoading(indicator?: LoadingIndicator): LoadingIndicator {
        this.indicator.startLoading();
        if (indicator && indicator !== this.indicator) {
            indicator.startLoading();
        }

        return indicator || this.indicator;
    }

    stopLoading(indicator?: LoadingIndicator): LoadingIndicator {
        this.indicator.stopLoading();
        if (indicator && indicator !== this.indicator) {
            indicator.stopLoading();
        }

        return indicator || this.indicator;
    }

    stopOnError(indicator?: LoadingIndicator): LoadingIndicator {
        this.indicator.stopOnError();
        if (indicator && indicator !== this.indicator) {
            indicator.stopOnError();
        }

        return indicator || this.indicator;
    }

    startObserving<T = any>(input: Observable<T>, indicator?: LoadingIndicator): Observable<T> {
        return new Observable<T>(subscriber => {
            this.startLoading(indicator);
            input
                .pipe(
                    catchError((err: HttpErrorResponse) => {
                      this.stopOnError(indicator);
                      this.errorService.catch(err.statusText);

                      return of(null);
                    }),
                    finalize(() => {
                        this.stopLoading(indicator);
                    }),
                )
                .subscribe(subscriber)
            ;
        });
    }
}
