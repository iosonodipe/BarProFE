import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmBookingRoutingModule } from './confirm-booking-routing.module';
import { ConfirmBookingComponent } from './confirm-booking.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    ConfirmBookingComponent
  ],
  imports: [
    CommonModule,
    ConfirmBookingRoutingModule,
    FontAwesomeModule
  ]
})
export class ConfirmBookingModule { }
