import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BcraExchangeService {
  private apiUrl = 'https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones/USD';

  constructor(private http: HttpClient) {}

  private getPreviousBusinessDay(date: Date): Date {
    const prev = new Date(date);
    do {
      prev.setDate(prev.getDate() - 1);
    } while (prev.getDay() === 0 || prev.getDay() === 6); // 0: domingo, 6: sábado
    return prev;
  }

  getLatestUsdRate(): Observable<number> {
    const fetchRate = (date: Date, retries = 7): Observable<number> => {
      const dateStr = date.toISOString().slice(0, 10);
      return this.http.get<any>(`${this.apiUrl}?fechaDesde=${dateStr}&fechaHasta=${dateStr}`).pipe(
        map(response => {
          if (
            response &&
            response.results &&
            response.results.length > 0 &&
            response.results[0].detalle &&
            response.results[0].detalle.length > 0 &&
            typeof response.results[0].detalle[0].tipoCotizacion === 'number'
          ) {
            return response.results[0].detalle[0].tipoCotizacion;
          }
          if (retries > 0) {
            const prevBusinessDay = this.getPreviousBusinessDay(date);
            throw { retry: true, prevDate: prevBusinessDay, retries: retries - 1 };
          }
          throw new Error('No se pudo obtener el tipo de cambio');
        })
      );
    };

    const retry = (err: any): Observable<number> => {
      if (err.retry && err.prevDate && err.retries >= 0) {
        return fetchRate(err.prevDate, err.retries).pipe(catchError(retry));
      }
      return of(1.00); // Si no se pudo obtener, devolver 1.00 como fallback
    };

    const today = new Date(); // Usar la fecha local de hoy
    return fetchRate(today).pipe(
      catchError(retry)
    );
  }
}