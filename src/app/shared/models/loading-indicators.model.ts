import {BehaviorSubject} from 'rxjs';

/**
 * an object retaining async operations loading status and overall operations stats
 * Does NOT keep track of which is started/ended/erroneous
 */
export class LoadingIndicator {
  /**
   * keeps a number of how many async operations are in progress
   */
  loading$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  /**
   * slag indicating that at least one async operation is in progress (loading)
   */
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * how many async operations have failed
   */
  errors = 0;
  /**
   * how many async operations were watched
   */
  total = 0;
  /**
   * how many async operations ended
   */
  endedLoading = 0;

  /**
   * start one async operation
   */
  startLoading() {
    this.loading$.next(this.loading$.value + 1);
    this.total++;
    this.computeProgress();
  }

  /**
   * mark one operation as erroneous
   */
  stopOnError() {
    this.errors++;
  }

  /**
   * stop one async operation
   */
  stopLoading() {
    if (this.loading$.value === 0) {
      console.error('Stopping an unregistered loading indicator');
    } else {
      this.loading$.next(this.loading$.value - 1);
    }
    this.endedLoading++;
    this.computeProgress();
  }

  protected computeProgress() {
    this.isLoading$.next(this.loading$.value > 0);
  }
}

/**
 * specialized for multiple operations (forkJoin) and keeps a progress of all async operations watched
 */
export class MultipleLoadingIndicators extends LoadingIndicator {
  /**
   * number of operations to be executed
   */
  target: number;
  /**
   * a number from 0 to 100 representing the procentual progress of all async operations
   */
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /**
   * set the number of operations that will be watched; resets previous stats
   * @param target
   */
  setTarget(target: number) {
    this.target = target;
    this.total = this.endedLoading = this.errors = 0;
    this.computeProgress();
  }

  protected computeProgress() {
    super.computeProgress();
    if (!this.target) {
      if (this.progress$.value !== 100) {
        this.progress$.next(100);
      }
      return;
    }
    this.progress$.next(Math.round(this.endedLoading / this.target * 100));
  }
}
