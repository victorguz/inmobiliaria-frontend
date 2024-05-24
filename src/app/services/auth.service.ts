import { Injectable } from '@angular/core';
import { database } from './database.service';
import {
  LoginRequest,
  LoginResponse,
  Usuario,
} from '../interfaces/auth.interfaces';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(body: LoginRequest) {
    const subject = new Subject<string>();

    database.usuarios.toArray().then((result) => {
      this.http
        .post<LoginResponse>(environment.API + 'login', {
          ...body,
          users: result,
        })
        .subscribe({
          next: (result) => {
            if (result.token) {
              this.token = result.token;
              subject.next('ok');
            }
          },
          error: (error) => subject.next(error.error.message),
        });
    });
    return subject.asObservable();
  }

  registrar(body: Usuario) {
    const subject = new Subject<string>();

    database.usuarios.toArray().then((result) => {
      this.http
        .post<Usuario>(environment.API + 'registrar', {
          ...body,
          users: result,
        })
        .subscribe({
          next: (result) => {
            if (result.username) {
              const { users, ...user } = result;
              this.crear(user);
              subject.next('ok');
            }
          },
          error: (error) => subject.next(error.error.message),
        });
    });
    return subject.asObservable();
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(AuthService.token);
  }

  crear(body: Usuario) {
    return database.usuarios.add({ ...body, id: Date.now() + '' });
  }

  async actualizar(id: string, body: Usuario) {
    await database.usuarios.update(id, body);
  }

  async eliminar(id: string) {
    await database.usuarios.delete(id);
  }

  private set token(token: string) {
    localStorage.setItem(environment.constants.token, token);
  }
  public static get token(): any {
    const jwt = localStorage.getItem(environment.constants.token);
    return jwt;
  }
}
