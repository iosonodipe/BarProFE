import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuotationService } from '../quotation/quotation.service';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-accept-quotation',
  templateUrl: './accept-quotation.component.html',
  styleUrls: ['./accept-quotation.component.scss']
})
export class AcceptQuotationComponent implements OnInit {

  confirm = faCheckCircle

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quotationService: QuotationService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const id = +params['id'];
      const idBarman = +params['idBarman'];
      this.acceptQuotation(id, idBarman);
    });
  }

  acceptQuotation(id: number, idBarman: number): void {
    this.quotationService.acceptQuotation(id, idBarman).subscribe(() =>{
      setTimeout(() => {
        this.router.navigate(['/my-bookings'])
      }, 1000);
    });
  }
}
