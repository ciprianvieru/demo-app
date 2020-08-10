import { Component, OnInit } from '@angular/core';
import {ErrorService} from '../../../shared/services/error.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  constructor(public errorService: ErrorService) { }

  ngOnInit(): void {
  }

  dismiss(index: number) {
    this.errorService.errors$.next(this.errorService.errors$.value.filter((v, i) => i !== index));
  }
}
