import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductFilterPipe } from '../product-filter.pipe';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFormComponent, ProductDetailComponent, ProductFilterPipe]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data: Product[]) => this.products = data);
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }

  deleteProduct(id: number) {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }
}