import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindBarmanComponent } from './find-barman.component';

const routes: Routes = [{ path: '', component: FindBarmanComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindBarmanRoutingModule { }
