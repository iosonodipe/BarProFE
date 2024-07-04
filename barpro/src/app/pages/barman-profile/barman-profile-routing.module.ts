import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarmanProfileComponent } from './barman-profile.component';

const routes: Routes = [{ path: '', component: BarmanProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarmanProfileRoutingModule { }
