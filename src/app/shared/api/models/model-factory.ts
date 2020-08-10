import {Product} from './product.model';

export class ModelFactory {
  static createProduct(defaults?: Partial<Product>): Required<Product> {
    return <Required<Product>> {
      productName: null,
      salesQ1: null,
      salesQ2: null,
      salesQ3: null,
      salesQ4: null,
      ...defaults,
      productID: null,
    };
  }
}
