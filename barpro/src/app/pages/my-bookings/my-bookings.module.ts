import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyBookingsRoutingModule } from './my-bookings-routing.module';
import { MyBookingsComponent } from './my-bookings.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    MyBookingsComponent,
  ],
  imports: [
    CommonModule,
    MyBookingsRoutingModule,
    NgbModule
  ]
})
export class MyBookingsModule { }
