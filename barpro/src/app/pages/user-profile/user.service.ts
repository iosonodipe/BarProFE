import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/i-user';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.userUrl;

  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, user)
  }

  uploadAvatar(username: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl}/${username}/avatar`, formData)
  }

  updateAvatar(username: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<string>(`${this.apiUrl}/${username}/avatar`, formData, { responseType: 'text' as 'json' })
  }

  getUserAvatar(username: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${username}/avatar`, { responseType: 'text' as 'json' });
  }
}
