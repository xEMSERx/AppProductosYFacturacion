import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ProductFormComponent {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnChanges() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    } else {
      this.productForm.reset();
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = { ...this.product, ...this.productForm.value };
      if (this.product && this.product.id) {
        this.productService.update(productData).subscribe(() => this.saved.emit());
      } else {
        this.productService.add(productData).subscribe(() => this.saved.emit());
      }
    }
  }
}