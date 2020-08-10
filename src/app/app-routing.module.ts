import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './auth/components/login/login.component';
import {UserService} from './auth/services/user.service';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'index.html', redirectTo: '/home', pathMatch: 'full' },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [UserService],
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
