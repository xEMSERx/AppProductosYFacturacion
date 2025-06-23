import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface InvoiceProduct {
  id: number;
  nombre: string;
  cantidad: number;
  precio: number;
}

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class InvoiceComponent {
  @Input() productos: InvoiceProduct[] = [];
  @Input() tipoCambioUSD: number = 1;
  @Output() confirmarCompra = new EventEmitter<void>();

  get totalARS(): number {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

  get totalUSD(): number {
    return this.totalARS / this.tipoCambioUSD;
  }

  confirmar() {
    this.confirmarCompra.emit();
  }
}