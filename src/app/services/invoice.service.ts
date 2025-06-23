import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/api/invoices';

  constructor(private http: HttpClient) {}

  saveInvoice(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}