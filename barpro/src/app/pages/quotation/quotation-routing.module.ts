import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationComponent } from './quotation.component';

const routes: Routes = [{ path: '', component: QuotationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationRoutingModule { }
