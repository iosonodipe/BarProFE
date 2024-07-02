import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking/booking.service';
import { QuotationService } from '../quotation/quotation.service';
import { IBooking } from '../../models/i-booking';
import { IQuotation } from '../../models/i-quotation';
import { AuthService } from '../../auth/auth.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit {
  bookings: IBooking[] = [];
  quotations: IQuotation[] = [];
  activeTab: number = 1;
  userId: number = 0;

  constructor(
    private bookingService: BookingService,
    private quotationService: QuotationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.userId = this.getUserIdFromLocalStorage();
        this.loadBookings();
        this.loadQuotations();
      }
    });
  }

  loadBookings(): void {
    this.bookingService.getAllUserBookings(this.userId, 0, 100, 'date').subscribe(data => {
      this.bookings = data.content;
    });
  }

  loadQuotations(): void {
    this.quotationService.getAllByUser(0, 100, 'requestDate', this.userId).subscribe(data => {
      this.quotations = data.content;
    });
  }



  private getUserIdFromLocalStorage(): number {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      return parsedData.userResponse?.user?.id || parsedData.barmanResponse?.user?.id || 0;
    }
    return 0;
  }

  deleteQuotation(id: number) : void{
    this.quotationService.deleteQuotation(id).subscribe(() => {
      this.loadQuotations();
    });
  }

  onTabChange(event: NgbNavChangeEvent): void {
    this.activeTab = event.nextId;
  }
}
