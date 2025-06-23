import {Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class ProductFormComponent implements OnInit, OnChanges {
  @Input() product: Product | null = null;
  @Output() saved = new EventEmitter<void>();

  productForm!: FormGroup;
  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
      imagen: ['']
      });
    this.loadProducts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.productForm && this.product) {
    this.productForm.patchValue(this.product);
    }
  }

  onSubmit() {
    if (this.productForm.invalid) return;
    const productData = { ...this.selectedProduct, ...this.productForm.value };

    if (this.selectedProduct && this.selectedProduct.id) {
      this.productService.update(productData).subscribe(() => { // Actualizar producto existente
        this.saved.emit();
        this.productForm.reset();
        this.selectedProduct = null;
        this.loadProducts();
      });
    } else {
      this.productService.add(productData).subscribe(() => { // Crear nuevo producto
        this.saved.emit();
        this.productForm.reset();
        this.loadProducts();
      });
    }
  }

  onCancel() {
    this.productForm.reset();
    this.selectedProduct = null;
  }

  onEdit(product: Product) {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
  }

  deleteProduct(product: Product) {
    if (confirm('¿Estás seguro de que querés eliminar el producto?')) {
      this.productService.delete(product.id!).subscribe(() => {
        this.loadProducts();
        if (this.selectedProduct?.id === product.id) {
        this.productForm.reset();
        this.selectedProduct = null;
        }
      });
    }
  }

  loadProducts() {
    this.productService.getAll().subscribe(data => {
    this.products = data;
    });
  }
}