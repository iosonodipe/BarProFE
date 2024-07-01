import { Component } from '@angular/core';
import { BarmanService } from './barman.service';
import { IBarman } from '../../models/i-barman';
import { ActivatedRoute } from '@angular/router';
import { IBookingRequest } from '../../models/i-booking-request';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-barman',
  templateUrl: './barman.component.html',
  styleUrl: './barman.component.scss'
})
export class BarmanComponent {

  constructor(barmanSvc: BarmanService, private router: ActivatedRoute, private modalService: NgbModal) {
    this.router.params.subscribe(params => {
      const id = +params['id']; // Converti il parametro ID a numero
      barmanSvc.getById(id).subscribe(barman => this.barman = barman);
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
    avatar: '/assets/img/avatardefault_92824.webp'
  }

  bookingRequest: IBookingRequest ={
    idUser: 0,
    idBarman: 0,
    date: '',
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

  submit(form: any) {
    if (form.valid) {
      console.log('Form Data: ', form.value);
      // Handle the form submission logic here
      this.modalService.dismissAll(form.value);
    }
  }
}
