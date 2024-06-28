import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OurBarmenRoutingModule } from './our-barmen-routing.module';
import { OurBarmenComponent } from './our-barmen.component';


@NgModule({
  declarations: [
    OurBarmenComponent
  ],
  imports: [
    CommonModule,
    OurBarmenRoutingModule
  ]
})
export class OurBarmenModule { }
