import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {APIService} from './services/api.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    APIService,
  ],
})
export class ApiModule { }
