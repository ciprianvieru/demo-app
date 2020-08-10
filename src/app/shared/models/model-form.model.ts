import {FormArray, FormControl} from '@angular/forms';

export type ModelForm<T> = {
  [k in keyof T]?: any[] | FormArray | FormControl;
};
