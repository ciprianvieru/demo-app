import {NgModule} from '@angular/core';
import {ListComponent} from './components/list/list.component';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from './routing.module';


@NgModule({
  declarations: [ListComponent],
  exports: [ListComponent],
  imports: [
    SharedModule,
    RoutingModule,
  ],
})
export class SalesModule { }
