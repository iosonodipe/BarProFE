import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IQuotation } from '../../models/i-quotation';
import { IPage } from '../../models/i-page';
import { IQuotationRequest } from '../../models/i-quotation-request';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  constructor(private http: HttpClient) {}

  quotationsSubj = new BehaviorSubject<IQuotation[]>([]);
  $quotations = this.quotationsSubj.asObservable();
  apiUrl: string = environment.quotationUrl;

  getAll(page: number = 0, size: number = 10, sortBy: string = 'id'): Observable<IPage<IQuotation>> {
    return this.http.get<IPage<IQuotation>>(`${this.apiUrl}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  getById(id: number): Observable<IQuotation> {
    return this.http.get<IQuotation>(`${this.apiUrl}/${id}`);
  }

  getAllByCity(page: number = 0, size: number = 10, city: string): Observable<IPage<IQuotation>> {
    return this.http.get<IPage<IQuotation>>(`${this.apiUrl}/byCity?page=${page}&size=${size}&city=${city}`);
  }

  getAllByUser(page: number = 0, size: number = 10, sortBy: string = 'requestDate', id: number): Observable<IPage<IQuotation>> {
    return this.http.get<IPage<IQuotation>>(`${this.apiUrl}/byUser/${id}?page=${page}&size=${size}&sortBy=${sortBy}`);
  }

  createQuotation(quotation: IQuotationRequest): Observable<IQuotation> {
    return this.http.post<IQuotation>(this.apiUrl, quotation)
      .pipe(
        tap(() => this.refreshQuotations())
      );
  }

  respondToQuotation(id: number, barmanId: number, priceDetails: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/respond`, null, {
      params: {
        barmanId: barmanId.toString(),
        priceDetails: priceDetails.toString()
      }
    }).pipe(
      tap(() => this.refreshQuotations())
    );
  }

  acceptQuotation(id: number, idBarman: number): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/${id}/accept`, null, {
      params: {
        idBarman: idBarman.toString()
      },
      responseType: 'text' as 'json'
    }).pipe(
      tap(() => this.refreshQuotations())
    );
  }

  updateQuotation(id: number, quotation: IQuotationRequest): Observable<IQuotation> {
    return this.http.put<IQuotation>(`${this.apiUrl}/${id}`, quotation)
      .pipe(
        tap(() => this.refreshQuotations())
      );
  }

  deleteQuotation(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json' })
      .pipe(
        tap(() => this.refreshQuotations())
      );
  }

  private refreshQuotations() {
    this.getAll().subscribe((IPage) => {
      this.quotationsSubj.next(IPage.content);
    });
  }
}
