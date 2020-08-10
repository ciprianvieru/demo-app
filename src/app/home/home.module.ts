import {NgModule} from '@angular/core';
import {NavComponent} from './components/nav/nav.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {HomeComponent} from './components/home/home.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    NavComponent,
    BreadcrumbsComponent,
    HomeComponent,
  ],
  exports: [
    NavComponent,
    BreadcrumbsComponent,
    HomeComponent,
  ],
})
export class HomeModule { }
