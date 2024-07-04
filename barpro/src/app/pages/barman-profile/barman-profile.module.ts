import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarmanProfileRoutingModule } from './barman-profile-routing.module';
import { BarmanProfileComponent } from './barman-profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BarmanProfileComponent
  ],
  imports: [
    CommonModule,
    BarmanProfileRoutingModule,
    ReactiveFormsModule
  ]
})
export class BarmanProfileModule { }
