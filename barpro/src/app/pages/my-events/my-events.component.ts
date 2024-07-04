import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking/booking.service';
import { IBooking } from '../../models/i-booking';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit {
  bookings: IBooking[] = [];
  pendingBookings: IBooking[] = [];
  confirmedBookings: IBooking[] = [];

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    const barmanId = this.getBarmanIdFromLocalStorage();
    this.bookingService.getAllBarmanBookings(barmanId, 0, 100, 'date').subscribe(data => {
      this.bookings = data.content;
      this.filterBookings();
    });
  }

  filterBookings(): void {
    this.pendingBookings = this.bookings.filter(booking => booking.status === 'PENDING');
    this.confirmedBookings = this.bookings.filter(booking => booking.status === 'CONFIRMED');
  }

  getBarmanIdFromLocalStorage(): number {
    const accessData = JSON.parse(localStorage.getItem('accessData') || '{}');
    return accessData.barmanResponse?.barman?.id || 0;
  }

  confirmDeleteBooking(id: number): void {
    Swal.fire({
      title: 'Sei sicuro?',
      text: "Il cliente verrà avvisato via mail",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sì, elimina',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBooking(id);
      }
    });
  }

  deleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      Swal.fire(
        'Eliminato!',
        'La prenotazione è stata eliminata.',
        'success'
      );
      this.loadBookings();
    });
  }

  confirmBooking(id: number): void {
    Swal.fire({
      title: 'Confermare la prenotazione?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sì, conferma',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.confirmBooking(id).subscribe((response) => {
          Swal.fire(
            'Confermato!',
            response, // Mostra la risposta come messaggio di successo
            'success'
          );
          this.loadBookings();
        }, (error) => {
          Swal.fire(
            'Errore!',
            'Si è verificato un errore durante la conferma della prenotazione.',
            'error'
          );
          console.error(error);
        });
      }
    });
  }
}
