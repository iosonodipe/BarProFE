import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking/booking.service';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit {

  confirm = faCheckCircle

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.confirmBooking(id);
    });
  }

  confirmBooking(id: number): void {
    this.bookingService.confirmBooking(id).subscribe(() => {
      setTimeout(() => {
        this.router.navigate(['/my-events']);
      }, 1000);
    });
  }
}
