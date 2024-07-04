import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceptQuotationRoutingModule } from './accept-quotation-routing.module';
import { AcceptQuotationComponent } from './accept-quotation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AcceptQuotationComponent
  ],
  imports: [
    CommonModule,
    AcceptQuotationRoutingModule,
    FontAwesomeModule
  ]
})
export class AcceptQuotationModule { }
