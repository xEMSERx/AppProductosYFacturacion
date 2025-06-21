import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product.model';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
  transform(products: Product[], searchText: string): Product[] {
    if (!products) return [];
    if (!searchText) return products;
    searchText = searchText.toLowerCase();
    return products.filter(product =>
      product.nombre.toLowerCase().includes(searchText) ||
      product.categoria.toLowerCase().includes(searchText)
    );
  }
}