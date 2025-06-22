import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //otras futuras rutas
  { path: 'products/form', component: ProductFormComponent },
  //
  { path: '', redirectTo: 'login', pathMatch: 'full' }];
