import {NgModule} from '@angular/core';
import {UserService} from './services/user.service';
import {LoginComponent} from './components/login/login.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
  ],
  providers: [
    UserService,
  ],
})
export class AuthModule { }
