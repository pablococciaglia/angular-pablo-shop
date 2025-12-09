import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-signup-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup-page.html',
})
export class SignupPage {
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  hasErrors = signal(false);
  isPosting = signal(false);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      this.hasErrors.set(true);
      setTimeout(() => {
        this.hasErrors.set(false);
      }, 2000);
      return;
    }
    if (this.registerForm.valid) {
      const { email, password, fullName } = this.registerForm.value;
      if (email && password && fullName)
        this.authService.register({ email, password, fullName }).subscribe((resp) => {});
    }
  }
}
