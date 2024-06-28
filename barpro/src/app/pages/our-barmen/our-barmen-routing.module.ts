import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OurBarmenComponent } from './our-barmen.component';

const routes: Routes = [{ path: '', component: OurBarmenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OurBarmenRoutingModule { }
