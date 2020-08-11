import {Component} from '@angular/core';
import {ErrorService} from '../../../shared/services/error.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
})
export class ConsoleComponent {

  constructor(public errorService: ErrorService) {
  }

  dismiss(index: number) {
    this.errorService.errors$.next(this.errorService.errors$.value.filter((v, i) => i !== index));
  }
}
