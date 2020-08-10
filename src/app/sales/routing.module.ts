import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from './components/list/list.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: '',
      pathMatch: 'full',
      component: ListComponent,
    }])
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutingModule {

}
