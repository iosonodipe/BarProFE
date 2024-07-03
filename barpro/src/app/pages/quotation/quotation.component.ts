import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IQuotation } from '../../models/i-quotation';
import { QuotationService } from './quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.scss'
})
export class QuotationComponent implements OnInit {
  quotations: IQuotation[] = [];
  quotationForm: FormGroup;
  currentQuotation: IQuotation | null = null;

  constructor(
    private quotationService: QuotationService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.quotationForm = this.fb.group({
      priceDetails: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadQuotations();
  }

  loadQuotations(): void {
    this.quotationService.getAll(0, 100, 'requestDate').subscribe(data => {
      this.quotations = data.content.filter(q => q.status === 'OPEN');
    });
  }

  openQuotationModal(content: any, quotation: IQuotation): void {
    this.currentQuotation = quotation;
    this.quotationForm.reset();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  confirmQuotation(modal: any): void {
    if (this.currentQuotation) {
      const priceDetails = this.quotationForm.get('priceDetails')?.value;
      const barmanId = this.getBarmanIdFromLocalStorage(); // Assuming you have a method to get the barman ID
      this.quotationService.respondToQuotation(this.currentQuotation.id, barmanId, priceDetails).subscribe(() => {
        Swal.fire('Proposta inviata', 'La tua proposta è stata inviata con successo!', 'success');
        this.loadQuotations();
        modal.close();
      }, (error) => {
        Swal.fire('Errore', 'Si è verificato un errore durante l\'invio della proposta', 'error');
      });
    }
  }

  getBarmanIdFromLocalStorage(): number {
    const accessData = JSON.parse(localStorage.getItem('accessData') || '{}');
    return accessData.barmanResponse?.barman?.id || 0;
  }
}
