import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarmanProfileRoutingModule } from './barman-profile-routing.module';
import { BarmanProfileComponent } from './barman-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    BarmanProfileComponent
  ],
  imports: [
    CommonModule,
    BarmanProfileRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class BarmanProfileModule { }
