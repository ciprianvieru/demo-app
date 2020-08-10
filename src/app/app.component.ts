import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UserService} from './auth/services/user.service';
import {LoadingIndicatorService} from './shared/services/loading-indicator.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean> = this.indicatorService.indicator.isLoading$;

  constructor(public userService: UserService,
              private indicatorService: LoadingIndicatorService) {
  }

  ngOnInit(): void {
  }
}
