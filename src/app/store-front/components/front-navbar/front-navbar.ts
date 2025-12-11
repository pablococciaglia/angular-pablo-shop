import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStatus } from '@auth/interfaces/auth.interface';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
  authStatus = AuthStatus;
  authService = inject(AuthService);

  logout() {
    this.authService.logOut();
  }
}
