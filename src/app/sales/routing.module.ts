import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {ViewComponent} from './components/edit/view.component';
import {EntityMode} from '../shared/models/entity-mode.model';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ListComponent,
      },
      {
        path: 'new',
        pathMatch: 'full',
        component: ViewComponent,
        data: {
          productID: null,
          mode: EntityMode.ADD,
        },
      },
      {
        path: ':productID',
        component: ViewComponent,
        data: {
          mode: EntityMode.VIEW,
        },
        children: [
          {
            path: 'edit',
            component: ViewComponent,
            data: {
              mode: EntityMode.EDIT,
            }
          }
        ]
      },
    ])
  ],
  exports: [
    RouterModule,
  ],
})
export class RoutingModule {

}
