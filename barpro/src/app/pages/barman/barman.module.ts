import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarmanRoutingModule } from './barman-routing.module';
import { BarmanComponent } from './barman.component';
import { BarmanCardComponent } from './barman-card/barman-card.component';


@NgModule({
  declarations: [
    BarmanComponent,
    BarmanCardComponent
  ],
  imports: [
    CommonModule,
    BarmanRoutingModule
  ],
   exports: [
    BarmanCardComponent // Esportazione del componente
  ]
})
export class BarmanModule { }
