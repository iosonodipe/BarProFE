import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IQuotationRequest } from '../../models/i-quotation-request';
import { QuotationService } from '../quotation/quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-barman',
  templateUrl: './find-barman.component.html',
  styleUrls: ['./find-barman.component.scss']
})
export class FindBarmanComponent {
  quotationRequest: IQuotationRequest = {
    idUser: 0,
    eventDetails: '',
    city: '',
    requestDate: '',
    requestTime: '00:00',
    status: 'pending'
  };

  errorMessage: string = '';

  constructor(private quotationService: QuotationService, private router: Router) { }

  submitRequest(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Per favore, compila tutti i campi obbligatori correttamente.';
      return;
    }

    this.quotationRequest.idUser = this.getUserIdFromLocalStorage();
    const requestDateTime = `${this.quotationRequest.requestDate}T${this.quotationRequest.requestTime}:00`;
    this.quotationRequest.requestDate = requestDateTime;

    this.quotationService.createQuotation(this.quotationRequest).subscribe(
      response => {
        console.log('Request submitted successfully', response);
      },
      error => {
        this.errorMessage = error;
        console.error('Error submitting request', error);
      }
    );
  }

  private getUserIdFromLocalStorage(): number {
    const accessData = localStorage.getItem('accessData');
    if (accessData) {
      const parsedData = JSON.parse(accessData);
      return parsedData.userResponse?.user?.id || parsedData.barmanResponse?.user?.id || 0;
    }
    return 0;
  }
}
