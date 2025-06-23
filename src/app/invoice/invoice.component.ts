import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BcraExchangeService } from '../services/bcra-exchange.service';

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
export class InvoiceComponent implements OnInit {
  @Input() productos: InvoiceProduct[] = [];
  @Input() tipoCambioUSD: number | null = null;
  @Output() confirmarCompra = new EventEmitter<void>();

  tipoCambioFecha: string = '';
  mensajeConfirmacion: string = '';

  constructor(private bcraService: BcraExchangeService) {}

  ngOnInit() {
    if (this.tipoCambioUSD === null) {
      this.bcraService.getLatestUsdRate().subscribe({
        next: (rate) => {
          this.tipoCambioUSD = rate;
          this.tipoCambioFecha = new Date().toLocaleDateString();
        },
        error: () => {
          this.tipoCambioUSD = 1;
          this.tipoCambioFecha = 'No disponible';
        }
      });
    }
  }

  get totalARS(): number {
    return this.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

  get totalUSD(): number {
    return this.tipoCambioUSD ? this.totalARS / this.tipoCambioUSD : 0;
  }

  confirmar() {
    this.confirmarCompra.emit();
    this.mensajeConfirmacion = '¡Compra confirmada exitosamente!';
    }
}