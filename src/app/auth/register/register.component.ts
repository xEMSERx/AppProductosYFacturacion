import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  mensaje: string = '';
  error: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.mensaje = '';
    this.error = '';
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.mensaje = 'Registro exitoso',
        error: err => this.error = err.error?.message || 'Error en el registro'
      });
    }
  }
}