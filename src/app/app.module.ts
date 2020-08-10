import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';

/**
 * Module
 */
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
