import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private readonly API_BASE_URL = environment.apiUrl;

  get<T>(endpoint: string): Observable<T> {
    return this.http
      .get<T>(`${this.API_BASE_URL}${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .post<T>(`${this.API_BASE_URL}${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http
      .put<T>(`${this.API_BASE_URL}${endpoint}`, data)
      .pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http
      .delete<T>(`${this.API_BASE_URL}${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Código: ${error.status}\nMensagem: ${error.message}`;
    }
    
    console.error('Erro na requisição:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

