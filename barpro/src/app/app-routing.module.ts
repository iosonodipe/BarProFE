import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }, { path: 'barman', loadChildren: () => import('./pages/barman/barman.module').then(m => m.BarmanModule) },
  { path: 'booking', loadChildren: () => import('./pages/booking/booking.module').then(m => m.BookingModule) },
  { path: 'quotation', loadChildren: () => import('./pages/quotation/quotation.module').then(m => m.QuotationModule) },
  {path: '', component: HomeComponent},
  { path: 'our-barmen', loadChildren: () => import('./pages/our-barmen/our-barmen.module').then(m => m.OurBarmenModule) },
  { path: 'find-barman', loadChildren: () => import('./pages/find-barman/find-barman.module').then(m => m.FindBarmanModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
