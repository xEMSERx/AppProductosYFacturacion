import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<void>();

  productForm!: FormGroup;
  products: Product[] = [];

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: ['']
    });

    if (this.product) {
      this.productForm.patchValue(this.product);
    }

    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.productForm) {
      if (this.product) {
        this.productForm.patchValue(this.product);
      } else {
        this.productForm.reset();
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = { ...this.product, ...this.productForm.value };
      if (this.product && this.product.id) {
        this.productService.update(productData).subscribe({
          next: () => {
            this.saved.emit();
            this.loadProducts();
          },
          error: (err) => console.error('Error al actualizar producto:', err)
        });
      } else {
        this.productService.add(productData).subscribe({
          next: () => {
            this.saved.emit();
            this.productForm.reset();
            this.loadProducts();
          },
          error: (err) => console.error('Error al agregar producto:', err)
        });
      }
    }
  }

  onCancel() {
    this.saved.emit();
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => this.products = data);
  }
}