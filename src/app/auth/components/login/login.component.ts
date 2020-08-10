import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {combineAll, distinctUntilChanged, map, switchMap, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {StoredUser} from '../../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  attempt$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  isLocked$: Observable<boolean>;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(public userService: UserService,
              router: Router,
              builder: FormBuilder) {
    this.form = builder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.isLocked$ = this.attempt$
      .pipe(
        withLatestFrom(this.form.valueChanges),
        tap(([, user]) => this.form.valid && this.userService.userAttempt$.next(<StoredUser> user)),
        switchMap(() => this.userService.isAuthenticated$),
        tap(isAuthenticated => {
          if (isAuthenticated) {
            router.navigate(['home']);
          }
        }),
        map(isAuthenticated => !isAuthenticated),
        takeUntil(this.onDestroy$),
      )
    ;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.complete();
  }
}
