import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ProductListComponent]
})
export class AppComponent {}