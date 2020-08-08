import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './home/components/home/home.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'index.html', redirectTo: '/home', pathMatch: 'full' },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomeComponent,
      },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
