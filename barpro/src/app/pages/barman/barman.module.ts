import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarmanRoutingModule } from './barman-routing.module';
import { BarmanComponent } from './barman.component';


@NgModule({
  declarations: [
    BarmanComponent
  ],
  imports: [
    CommonModule,
    BarmanRoutingModule
  ]
})
export class BarmanModule { }
