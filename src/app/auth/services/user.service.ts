import {Injectable} from '@angular/core';
import {StoredUser, User} from '../models/user.model';
import {BehaviorSubject, Observable, combineLatest} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class UserService implements CanActivate {
  userAttempt$: BehaviorSubject<StoredUser> = new BehaviorSubject<StoredUser>(null);
  storedUsers$: BehaviorSubject<StoredUser[]> = new BehaviorSubject<StoredUser[]>([
    <StoredUser> {
      username: 'user1',
      password: 'user1',
    },
    <StoredUser> {
      username: 'user2',
      password: 'user2',
    },
  ]);
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private router: Router) {
    this.user$ = combineLatest([this.userAttempt$, this.storedUsers$])
      .pipe(
        tap(([user]) => !user && this.router.navigate(['login'])),
        filter(([user]) => !!user),
        map(([user, users]) => users.find(u => u.username === user.username
          && u.password === user.password)),
        filter(foundUser => !!foundUser),
        map(user => <User> {
          username: user.username,
        }),
      );
    this.isAuthenticated$ = this.user$.pipe(map(u => !!u));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthenticated$.pipe(
      tap(user => !user && this.router.navigate(['login'])),
    );
  }
}
