import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BcraExchangeService {
  private apiUrl = 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD';

  constructor(private http: HttpClient) {}

  getLatestUsdRate(): Observable<number> { // Obtiene el tipo de cambio más reciente
    const today = new Date().toISOString().slice(0, 10);
    return this.http.get<any[]>(`${this.apiUrl}?fechaDesde=${today}&fechaHasta=${today}`).pipe(
      map(data => { // La API devuelve un array, tomamos el último valor de venta
        if (data && data.length > 0) {
          return data[data.length - 1].v; // 'v' es el valor de venta
        }
        throw new Error('No se pudo obtener el tipo de cambio');
      })
    );
  }
}