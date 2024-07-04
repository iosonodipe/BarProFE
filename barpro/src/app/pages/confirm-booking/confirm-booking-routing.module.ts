import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmBookingComponent } from './confirm-booking.component';

const routes: Routes = [{ path: '', component: ConfirmBookingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmBookingRoutingModule { }
