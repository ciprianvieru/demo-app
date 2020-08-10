import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ErrorService} from './services/error.service';
import {LoadingIndicatorService} from './services/loading-indicator.service';
import {TableModule} from 'primeng/table';
import {ApiModule} from './api/api.module';
import {RouterModule} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ApiModule,
    ProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ApiModule,
    ProgressSpinnerModule,
  ],
  providers: [
    ErrorService,
    LoadingIndicatorService,
  ],
})
export class SharedModule {
}
