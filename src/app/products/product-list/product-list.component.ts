import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductFilterPipe } from '../product-filter.pipe';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { InvoiceComponent, InvoiceProduct } from '../../invoice/invoice.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductFilterPipe, InvoiceComponent]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  selectedProducts: InvoiceProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().subscribe((data: Product[]) => this.products = data);
  }

  addProduct(product: Product) {
    const existing = this.selectedProducts.find(p => p.id === product.id);
    if (existing) {
      existing.cantidad++;
    } else {
      this.selectedProducts.push({
        id: product.id,
        nombre: product.nombre,
        cantidad: 1,
        precio: product.precio
      });
    }
  }

  removeProduct(product: Product) {
    const idx = this.selectedProducts.findIndex(p => p.id === product.id);
    if (idx > -1) {
      if (this.selectedProducts[idx].cantidad > 1) {
        this.selectedProducts[idx].cantidad--;
      } else {
        this.selectedProducts.splice(idx, 1);
      }
    }
  }

  isProductSelected(product: Product): boolean {
    return this.selectedProducts.some(sel => sel.id === product.id);
  }

  getSelectedProductQuantity(product: Product): number {
    const found = this.selectedProducts.find(sel => sel.id === product.id);
    return found ? found.cantidad : 0;
  }
}