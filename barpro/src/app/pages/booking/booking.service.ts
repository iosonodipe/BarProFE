import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IBooking } from '../../models/i-booking';
import { IPage } from '../../models/i-page';
import { IBookingRequest } from '../../models/i-booking-request';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private http: HttpClient) {
    this.getAll(0, 100).subscribe((IPage) => {
      this.bookingsSubj.next(IPage.content);
    });
  }

  bookingsSubj = new BehaviorSubject<IBooking[]>([]);
  $bookings = this.bookingsSubj.asObservable();
  apiUrl: string = environment.bookingsUrl;

  getAll(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<IPage<IBooking>> {
    return this.http.get<IPage<IBooking>>(`${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getById(id: number): Observable<IBooking> {
    return this.http.get<IBooking>(`${this.apiUrl}/${id}`);
  }

  getAllUserBookings(userId: number, page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<IPage<IBooking>> {
    return this.http.get<IPage<IBooking>>(`${this.apiUrl}/user/${userId}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getAllBarmanBookings(barmanId: number, page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<IPage<IBooking>> {
    return this.http.get<IPage<IBooking>>(`${this.apiUrl}/barman/${barmanId}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  createBooking(booking: IBookingRequest): Observable<IBooking> {
    return this.http.post<IBooking>(this.apiUrl, booking)
    .pipe(
      tap(() => this.refreshBookings())
    );
  }

  confirmBooking(id: number): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/${id}/confirm`, {})
    .pipe(
      tap(() => this.refreshBookings())
    );
  }

  updateBooking(id: number, booking: IBookingRequest): Observable<IBooking> {
    return this.http.put<IBooking>(`${this.apiUrl}/${id}`, booking)
    .pipe(
      tap(() => this.refreshBookings())
    );
  }

  deleteBooking(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`)
    .pipe(
      tap(() => this.refreshBookings())
    );
  }

  private refreshBookings() {
    this.getAll().subscribe((IPage) => {
      this.bookingsSubj.next(IPage.content);
    });
  }
}
