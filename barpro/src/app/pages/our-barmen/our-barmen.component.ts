import { Component, OnInit } from '@angular/core';
import { IBarman } from '../../models/i-barman';
import { BarmanService } from '../barman/barman.service';
import { LoaderService } from '../../main-components/loader/loader.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../auth/auth.service';
import { IBookingRequest } from '../../models/i-booking-request';
import Swal from 'sweetalert2';
import { BookingService } from '../booking/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-barmen',
  templateUrl: './our-barmen.component.html',
  styleUrls: ['./our-barmen.component.scss']
})
export class OurBarmenComponent implements OnInit {
  barmen: IBarman[] = [];
  page: number = 0;
  size: number = 10;
  sortBy: string = 'id';
  city: string = '';
  totalPages: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 50]; // Opzioni di dimensione della pagina

  barman: IBarman | null = null;
  isUserLoggedIn: boolean = false;
  bookingRequest: IBookingRequest = {
    idUser: 0,
    idBarman: 0,
    date: '',
    time: '',
    eventDetails: '',
    city: ''
  };

  constructor(private barmanService: BarmanService, private loaderService: LoaderService, private modalService: NgbModal, private authSvc: AuthService, private bookingSvc: BookingService, private router: Router, private loader: LoaderService) {}

  ngOnInit(): void {
    this.loadBarmen();
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    });
  }

  loadBarmen(): void {
    this.loaderService.showLoading();
    this.barmanService.getAll(this.page, this.size, this.sortBy).subscribe(data => {
      setTimeout(() => {
        this.loaderService.hideLoading();
        this.barmen = data.content;
        this.totalPages = data.totalPages;
      }, 400);
    });
  }

  applyFilters(): void {
    this.page = 0; // Reset page to 0 whenever filters are applied
    this.loadBarmen();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.loadBarmen();
    }
  }

  openBarmanModal(barman: IBarman, content: any): void {
    this.barman = barman;
    this.bookingRequest.idBarman = barman.id;
    this.modalService.open(content).result.then((result) => {
      console.log('Modal closed with: ', result);
    }, (reason) => {
      console.log('Modal dismissed with: ', reason);
    });
  }

  openContactModal(content: any): void {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log('Modal closed with: ', result);
    }, (reason) => {
      console.log('Modal dismissed with: ', reason);
    });
  }

  submit(form: any, modal: any): void {
    Swal.fire({
      title: "Confermi la richiesta?",
      showDenyButton: true,
      icon: "question",
      showCancelButton: false,
      confirmButtonText: "Invia",
      denyButtonText: `Annulla`
    }).then((result) => {
      if (result.isConfirmed) {
        this.loader.showLoading()
        if (form.valid) {
          this.setUserFromLocalStorage();
          this.bookingRequest.date = this.formatLocalDateTime(this.bookingRequest.date, this.bookingRequest.time); // Formatta la data e l'orario per il server
          console.log('Form Data: ', this.bookingRequest);
          this.bookingSvc.createBooking(this.bookingRequest).subscribe(
            () => {
              this.modalService.dismissAll();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Richiesta inviata!",
                showConfirmButton: false,
                timer: 1500
              });
              this.loader.hideLoading();
              this.router.navigate(['/my-bookings']);
            },
            error => {
              console.error('Error creating booking: ', error);
            }
          );
        }
      }
    });
  }

  setUserFromLocalStorage(): void {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      const userId = parsedData.userResponse?.user?.id;

      if (userId) {
        this.bookingRequest.idUser = userId; // Imposta l'id dell'utente
      }
    }
  }

  private formatLocalDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }
}
