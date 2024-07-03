import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationRoutingModule } from './quotation-routing.module';
import { QuotationComponent } from './quotation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    QuotationComponent
  ],
  imports: [
    CommonModule,
    QuotationRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class QuotationModule { }
