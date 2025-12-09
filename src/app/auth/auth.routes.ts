import { Routes } from '@angular/router';
import { LoginPage } from '@auth/pages/login-page/login-page';
import { SignupPage } from '@auth/pages/signup-page/signup-page';
import AuthLayout from '@auth/layout/auth-layout/auth-layout';

const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'register',
        component: SignupPage,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];

export default authRoutes;
