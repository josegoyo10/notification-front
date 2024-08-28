import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageRequest } from '../interfaces/message_request';

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

  addMessage(data: MessageRequest): Observable<any> {
    return this.http.post(`${this.api}/submit-message`, data, {
      headers: this.headers,
    });
  }

   getListNotifications(): Observable<any> {
    return this.http.get(`${this.api}/list-notification`, { headers: this.headers });
  }

}
