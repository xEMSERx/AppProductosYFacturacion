import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent, ProductDetailComponent],
})
export class AppComponent {}