import { AuthService } from './../../auth/auth.service';
import { BookingService } from './../booking/booking.service';
import { Component } from '@angular/core';
import { BarmanService } from './barman.service';
import { IBarman } from '../../models/i-barman';
import { ActivatedRoute } from '@angular/router';
import { IBookingRequest } from '../../models/i-booking-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barman',
  templateUrl: './barman.component.html',
  styleUrls: ['./barman.component.scss']
})
export class BarmanComponent {
  isUserLoggedIn: boolean = false;

  constructor(private authSvc: AuthService, private barmanSvc: BarmanService, private bookingSvc: BookingService, private router: ActivatedRoute, private modalService: NgbModal) {
    this.router.params.subscribe(params => {
      const id = +params['id']; // Converti il parametro ID a numero
      this.bookingRequest.idBarman = id
      barmanSvc.getById(id).subscribe(barman => this.barman = barman);
    });
  }

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    });
  }

  barman: IBarman = {
    experienceYears: 0,
    description: '',
    rating: 0,
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    city: '',
    avatar: ''
  }

  bookingRequest: IBookingRequest = {
    idUser: 0,
    idBarman: 0,
    date: '',
    time: '',
    eventDetails: '',
    city: ''
  }

  openContactModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log('Modal closed with: ', result);
    }, (reason) => {
      console.log('Modal dismissed with: ', reason);
    });
  }

  submit(form: any, modal: any) {
    Swal.fire({
      title: "Confermi la richiesta?",
      showDenyButton: true,
      icon: "question",
      showCancelButton: false,
      confirmButtonText: "Invia",
      denyButtonText: `Annulla`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (form.valid) {
          this.setUserFromLocalStorage();
          this.bookingRequest.date = this.formatLocalDateTime(this.bookingRequest.date, this.bookingRequest.time); // Formatta la data e l'orario per il server
          console.log('Form Data: ', this.bookingRequest);
          this.bookingSvc.createBooking(this.bookingRequest).subscribe(
            () => {
              Swal.fire("Richiesta inviata!", "", "success");
              modal.dismiss(this.bookingRequest);
            },
            error => {
              console.error('Error creating booking: ', error);
            }
          );
        }
      } else if (result.isDenied) {
      }
    });
  }

  setUserFromLocalStorage() {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      const userId = parsedData.userResponse?.user?.id;

      if (userId) {
        this.bookingRequest.idUser = userId;
         // Imposta l'id dell'utente
      }
    }
  }

  private formatLocalDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }
}
