import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordRegex } from '@auth/interfaces/auth.interface';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);

  hasErrors = signal(false);
  isPosting = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6)], //, Validators.pattern(passwordRegex)],
    ],
  });

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      this.hasErrors.set(true);
      setTimeout(() => {
        this.hasErrors.set(false);
      }, 2000);
      return;
    }
    if (this.loginForm.valid) {
      if (email && password)
        this.authService.authenticate({ email, password }).subscribe((resp) => {
          if (resp) {
            this.router.navigateByUrl('/');
          } else {
            this.hasErrors.set(true);
            setTimeout(() => {
              this.hasErrors.set(false);
            }, 2000);
          }
        });
    }
  }
}
