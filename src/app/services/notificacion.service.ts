import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  api: string = '';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.api = environment.api;
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`, { headers: this.headers });
  }
}
