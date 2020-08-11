import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {StoredUser} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form: FormGroup;
  attempt$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLocked$: Observable<boolean>;

  constructor(public userService: UserService,
              router: Router,
              builder: FormBuilder) {
    this.form = builder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.isLocked$ = this.attempt$
      .pipe(
        withLatestFrom(this.form.valueChanges.pipe(distinctUntilChanged())),
        tap(([, user]) => this.form.valid && this.userService.userAttempt$.next(<StoredUser> user)),
        switchMap(() => this.userService.isAuthenticated$),
        tap(isAuthenticated => {
          if (isAuthenticated) {
            router.navigate(['sales']);
          }
        }),
        map(isAuthenticated => !isAuthenticated),
      )
    ;
  }
}
