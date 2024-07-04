import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { IQuotation } from '../../models/i-quotation';
import { QuotationService } from './quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit {
  quotations: IQuotation[] = [];
  quotationForm: FormGroup;
  currentQuotation: IQuotation | null = null;

  // Paginazione
  currentPage: number = 1;
  pageSize: number = 10;
  totalQuotations: number = 0;

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
    this.quotationService.getAll(this.currentPage - 1, this.pageSize, 'requestDate').subscribe(data => {
      const openQuotations = data.content.filter(q => q.status === 'OPEN');
      if (openQuotations.length === 0 && this.currentPage > 1) {
        this.currentPage--;
        this.loadQuotations();
      } else {
        this.quotations = openQuotations;
        this.totalQuotations = data.totalElements - (data.content.length - openQuotations.length);

      }
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
      const barmanId = this.getBarmanIdFromLocalStorage();
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
