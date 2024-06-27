import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';


@NgModule({
  declarations: [
    QuotationComponent
  ],
  imports: [
    CommonModule,
    QuotationRoutingModule
  ]
})
export class QuotationModule { }
