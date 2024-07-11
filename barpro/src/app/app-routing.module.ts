import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GuestGuard } from './auth/guest.guard';
import { UserGuard } from './auth/user.guard';
import { BarmanGuard } from './auth/barman.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  // {
  //   path: 'barman',
  //   loadChildren: () =>
  //     import('./pages/barman/barman.module').then((m) => m.BarmanModule),
  //   canActivate: [UserGuard],
  //   canActivateChild: [UserGuard],
  // },
  {
    path: 'quotation',
    loadChildren: () =>
      import('./pages/quotation/quotation.module').then(
        (m) => m.QuotationModule
      ),
    canActivate: [BarmanGuard],
    canActivateChild: [BarmanGuard],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'our-barmen',
    loadChildren: () =>
      import('./pages/our-barmen/our-barmen.module').then(
        (m) => m.OurBarmenModule
      ),
  },
  {
    path: 'find-barman',
    loadChildren: () =>
      import('./pages/find-barman/find-barman.module').then(
        (m) => m.FindBarmanModule
      ),
      canActivate: [UserGuard],
      canActivateChild: [UserGuard],
  },
  {
    path: 'my-bookings',
    loadChildren: () =>
      import('./pages/my-bookings/my-bookings.module').then(
        (m) => m.MyBookingsModule
      ),
    canActivate: [UserGuard],
    canActivateChild: [UserGuard],
  },
  {
    path: 'my-events',
    loadChildren: () =>
      import('./pages/my-events/my-events.module').then(
        (m) => m.MyEventsModule
      ),
      canActivate: [BarmanGuard],
      canActivateChild: [BarmanGuard],
  },
  {
    path: 'accept-quotation/:id/:idBarman',
    loadChildren: () =>
      import('./pages/accept-quotation/accept-quotation.module').then(
        (m) => m.AcceptQuotationModule
      ),
      canActivate: [UserGuard],
      canActivateChild: [UserGuard],
  },
  {
    path: 'confirm-booking/:id',
    loadChildren: () =>
      import('./pages/confirm-booking/confirm-booking.module').then(
        (m) => m.ConfirmBookingModule
      ),
      canActivate: [BarmanGuard],
      canActivateChild: [BarmanGuard],
  },
  {
    path: 'user-profile',
    loadChildren: () =>
      import('./pages/user-profile/user-profile.module').then(
        (m) => m.UserProfileModule
      ),
      canActivate: [UserGuard],
      canActivateChild: [UserGuard],
  },
  {
    path: 'barman-profile',
    loadChildren: () =>
      import('./pages/barman-profile/barman-profile.module').then(
        (m) => m.BarmanProfileModule
      ),
      canActivate: [BarmanGuard],
      canActivateChild: [BarmanGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
