import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IBarman } from '../../models/i-barman';
import { IPage } from '../../models/i-page';

@Injectable({
  providedIn: 'root'
})
export class BarmanService {
  constructor(private http: HttpClient) {
    this.getAll(0, 100).subscribe((IPage) => {
      this.barmenSubj.next(IPage.content);
    });
  }

  barmenSubj = new BehaviorSubject<IBarman[]>([]);
  $barmen = this.barmenSubj.asObservable();
  apiUrl: string = environment.barmenUrl;

  getAll(IPage: number = 0, size: number = 10, sortBy: string = 'id'): Observable<IPage<IBarman>> {
    return this.http.get<IPage<IBarman>>(`${this.apiUrl}?page=${IPage}&size=${size}&sortBy=${sortBy}`);
  }

  getByCity(IPage: number = 0, size: number = 10, city: string): Observable<IPage<IBarman>> {
    return this.http.get<IPage<IBarman>>(`${this.apiUrl}/byCity?IPage=${IPage}&size=${size}&city=${city}`);
  }

  getByRating(IPage: number = 0, size: number = 10): Observable<IPage<IBarman>> {
    return this.http.get<IPage<IBarman>>(`${this.apiUrl}?page=${IPage}&size=${size}&sortBy=rating`);
  }

  getById(id: number): Observable<IBarman> {
    return this.http.get<IBarman>(`${this.apiUrl}/${id}`);
  }

  deleteBarman(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(() => this.refreshBarmen())
    );
  }

  updateBarman(id: number, barman: Partial<IBarman>): Observable<IBarman> {
    return this.http.put<IBarman>(`${this.apiUrl}/${id}`, barman)
    .pipe(
      tap(() => this.refreshBarmen())
    );
  }

  uploadAvatar(username: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<string>(`${this.apiUrl}/${username}/avatar`, formData)
    .pipe(
      tap(() => this.refreshBarmen())
    );
  }

  updateAvatar(username: string, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<string>(`${this.apiUrl}/${username}/avatar`, formData, { responseType: 'text' as 'json' })
    .pipe(
      tap(() => this.refreshBarmen())
    );
  }

  getUserAvatar(username: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${username}/avatar`, { responseType: 'text' as 'json' });
  }

  private refreshBarmen() {
    this.getAll().subscribe((IPage) => {
      this.barmenSubj.next(IPage.content);
    });
  }
}
