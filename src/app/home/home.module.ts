import {NgModule} from '@angular/core';
import {NavComponent} from './components/nav/nav.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';
import {ConsoleComponent} from './components/console/console.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NavComponent,
    BreadcrumbsComponent,
    HomeComponent,
    ConsoleComponent,
  ],
  exports: [
    NavComponent,
    BreadcrumbsComponent,
    HomeComponent,
    ConsoleComponent,
  ],
})
export class HomeModule {
}
