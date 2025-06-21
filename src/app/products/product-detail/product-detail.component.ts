import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class ProductDetailComponent {
  @Input() product: Product | null = null;
}