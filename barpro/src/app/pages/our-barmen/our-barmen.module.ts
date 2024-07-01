import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurBarmenRoutingModule } from './our-barmen-routing.module';
import { OurBarmenComponent } from './our-barmen.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OurBarmenComponent
  ],
  imports: [
    CommonModule,
    OurBarmenRoutingModule,
    FormsModule
  ]
})
export class OurBarmenModule { }
