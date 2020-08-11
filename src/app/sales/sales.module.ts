import {NgModule} from '@angular/core';
import {ListComponent} from './components/list/list.component';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from './routing.module';
import {ViewComponent} from './components/edit/view.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
  ],
  exports: [
    ListComponent,
    ViewComponent,
  ],
  imports: [
    SharedModule,
    RoutingModule,
  ],
})
export class SalesModule {
}
