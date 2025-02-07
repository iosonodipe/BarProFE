import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from '../booking/booking.service';
import { QuotationService } from '../quotation/quotation.service';
import { IBooking } from '../../models/i-booking';
import { IQuotation } from '../../models/i-quotation';
import { AuthService } from '../../auth/auth.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { IQuotationRequest } from '../../models/i-quotation-request';
import Swal from 'sweetalert2';
import { LoaderService } from '../../main-components/loader/loader.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss'],
})
export class MyBookingsComponent implements OnInit {
  bookings: IBooking[] = [];
  pendingBookings: IBooking[] = [];
  confirmedBookings: IBooking[] = [];
  quotations: IQuotation[] = [];
  activeTab: number = 1;
  userId: number = 0;
  bookingForm: FormGroup;
  quotationForm: FormGroup;
  currentBooking: IBooking | null = null;
  currentQuotation: IQuotation | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private quotationService: QuotationService,
    private authService: AuthService,
    private loader: LoaderService
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      eventDetails: ['', [Validators.required, Validators.maxLength(300)]],
      city: ['', Validators.required],
    });

    this.quotationForm = this.fb.group({
      requestDate: ['', Validators.required],
      requestTime: ['', Validators.required],
      eventDetails: ['', [Validators.required, Validators.maxLength(300)]],
      city: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.userId = this.getUserIdFromLocalStorage();
        this.loadBookings();
        this.loadQuotations();
      }
    });
  }

  loadBookings(): void {
    this.bookingService
      .getAllUserBookings(this.userId, 0, 100, 'date')
      .subscribe((data) => {
        this.bookings = data.content;
        this.filterBookings();
      });
  }

  filterBookings(): void {
    this.pendingBookings = this.bookings.filter(booking => booking.status === 'PENDING');
    this.confirmedBookings = this.bookings.filter(booking => booking.status === 'CONFIRMED');
  }

  loadQuotations(): void {
    this.quotationService
      .getAllByUser(0, 100, 'requestDate', this.userId)
      .subscribe((data) => {
        this.quotations = data.content;
      });
  }

  private getUserIdFromLocalStorage(): number {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      return (
        parsedData.userResponse?.user?.id ||
        parsedData.barmanResponse?.user?.id ||
        0
      );
    }
    return 0;
  }

  deleteQuotation(id: number): void {
    Swal.fire({
      title: 'Sei sicuro di eliminare?',
      showDenyButton: true,
      showCancelButton: false,
      icon: 'warning',
      confirmButtonText: 'Elimina',
      denyButtonText: `Annulla`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quotationService.deleteQuotation(id).subscribe(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Eliminato!",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadQuotations();
        });
      } else if (result.isDenied) {
      }
    });
  }

  onTabChange(event: NgbNavChangeEvent): void {
    this.activeTab = event.nextId;
  }

  openBookingModal(content: any, booking: IBooking): void {
    this.currentBooking = booking;
    this.bookingForm.patchValue({
      date: booking.date.split('T')[0],
      time: booking.date.split('T')[1].slice(0, 5),
      eventDetails: booking.eventDetails,
      city: booking.city,
    });
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'save' && this.currentBooking) {
          this.saveBooking();
        }
      },
      () => {
        this.currentBooking = null;
      }
    );
  }

  openQuotationModal(content: any, quotation: IQuotation): void {
    this.currentQuotation = quotation;
    this.quotationForm.patchValue({
      requestDate: quotation.requestDate.split('T')[0],
      requestTime: quotation.requestDate.split('T')[1].slice(0, 5),
      eventDetails: quotation.eventDetails,
      city: quotation.city,
    });
    this.modalService.open(content).result.then(
      (result) => {
        if (result === 'save' && this.currentQuotation) {
          this.saveQuotation();
        }
      },
      () => {
        this.currentQuotation = null;
      }
    );
  }

  saveBooking(): void {
    Swal.fire({
      title: 'Vuoi salvare le modifiche?',
      showDenyButton: true,
      icon: 'question',
      showCancelButton: false,
      confirmButtonText: 'Salva',
      denyButtonText: `Annulla`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.currentBooking) {
          this.modalService.dismissAll()
          this.loader.showLoading()
          const updatedBooking = {
            idUser: this.currentBooking.user.id,
            idBarman: this.currentBooking.barman.id,
            date: `${this.bookingForm.value.date}T${this.bookingForm.value.time}:00`,
            time: this.bookingForm.value.time,
            eventDetails: this.bookingForm.value.eventDetails,
            city: this.bookingForm.value.city,
          };

          this.bookingService
            .updateBooking(this.currentBooking.id, updatedBooking)
            .subscribe(() => {
              this.loader.hideLoading();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Salvato!",
                showConfirmButton: false,
                timer: 1500
              });
              this.loadBookings();
              this.modalService.dismissAll();
            });
        }
      } else if (result.isDenied) {
      }
    });
  }

  saveQuotation(): void {
    Swal.fire({
      title: 'Vuoi salvare le modifiche?',
      showDenyButton: true,
      icon: 'question',
      showCancelButton: false,
      confirmButtonText: 'Salva',
      denyButtonText: `Annulla`,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.currentQuotation) {
          const updatedQuotation: IQuotationRequest = {
            idUser: this.userId,
            requestDate: `${this.quotationForm.value.requestDate}T${this.quotationForm.value.requestTime}:00`,
            requestTime: this.quotationForm.value.requestTime,
            eventDetails: this.quotationForm.value.eventDetails,
            city: this.quotationForm.value.city,
            status: this.currentQuotation.status,
          };

          this.quotationService
            .updateQuotation(this.currentQuotation.id, updatedQuotation)
            .subscribe(
              () => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Salvato!",
                  showConfirmButton: false,
                  timer: 1500
                });
                this.loadQuotations();
                this.modalService.dismissAll();
              },
              (error) => {
                console.error('Error updating quotation:', error);
              }
            );
        }
      } else if (result.isDenied) {
      }
    });
  }

  confirmDeleteBooking(id: number): void {
    Swal.fire({
      title: 'Sei sicuro?',
      text: "Il barman verrà avvisato via mail",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sì, elimina',
      cancelButtonText: 'No, annulla'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.showLoading()
        this.bookingService.deleteBooking(id).subscribe(() => {
          this.loadBookings();
          this.loader.hideLoading()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Eliminato!",
            showConfirmButton: false,
            timer: 1500
          });
        });
      }
    });
  }


}
