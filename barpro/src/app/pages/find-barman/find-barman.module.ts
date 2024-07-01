import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindBarmanRoutingModule } from './find-barman-routing.module';
import { FindBarmanComponent } from './find-barman.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FindBarmanComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FindBarmanRoutingModule
  ]
})
export class FindBarmanModule { }
