import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarmanComponent } from './barman.component';

const routes: Routes = [{ path: '', component: BarmanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarmanRoutingModule { }
