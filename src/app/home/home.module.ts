import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavComponent} from './components/nav/nav.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {HomeComponent} from './components/home/home.component';


@NgModule({
  imports: [
    CommonModule,
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
