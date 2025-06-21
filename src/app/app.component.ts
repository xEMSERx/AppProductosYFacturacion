/*import { Component } from '@angular/core';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [ProductListComponent, ProductFormComponent, ProductDetailComponent, LoginComponent, RouterOutlet],
})
export class AppComponent {}*/

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // ✅ Asegurate de tener esto
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-productos-y-facturacion';
}
