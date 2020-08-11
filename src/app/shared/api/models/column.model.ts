import {Product} from './product.model';

export interface Column {
  header: string;
  field: keyof Product | string;
  subHeaders?: Column[];
}
