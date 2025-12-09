import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { AuthStatus, User } from '@auth/interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { rxResource } from '@angular/core/rxjs-interop';

const pathLogin = '/auth/login';
const pathRegister = '/auth/register';
const pathChecking = '/auth/check-status';
pathChecking;
const baseUrl = environment.baseUrl;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal(AuthStatus.CHECKING);
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));
  private http = inject(HttpClient);
  user = computed(() => this._user());
  token = computed(() => this._token());
  authStatus = computed(() => {
    if (this._authStatus() === AuthStatus.CHECKING) {
      return AuthStatus.CHECKING;
    }
    if (this._user()) {
      return AuthStatus.AUTHENTICATED;
    }
    return AuthStatus.NOT_AUTHENTICATED;
  });

  checkAuthStatus = rxResource({
    stream: () => this.checkStatus(),
  });

  authenticate({ email, password }: { email: string; password: string }): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}${pathLogin}`, { email, password }).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError(() => {
        this.logOut();
        return of(false);
      })
    );
  }

  register({
    email,
    password,
    fullName,
  }: {
    email: string;
    password: string;
    fullName: string;
  }): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${baseUrl}${pathRegister}`, { email, password, fullName })
      .pipe(
        map((resp) => this.handleAuthSuccess(resp)),
        catchError(() => {
          this.logOut();
          return of(false);
        })
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logOut();
      return of(false);
    }
    return this.http.get<AuthResponse>(`${baseUrl}${pathChecking}`).pipe(
      map((resp) => this.handleAuthSuccess(resp)),
      catchError(() => {
        this.logOut();
        return of(false);
      })
    );
  }

  logOut() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set(AuthStatus.NOT_AUTHENTICATED);
    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._user.set(user);
    this._token.set(token);
    this._authStatus.set(AuthStatus.AUTHENTICATED);
    localStorage.setItem('token', token);
    return true;
  }
}
