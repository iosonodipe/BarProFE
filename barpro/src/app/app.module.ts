import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './main-components/navbar/navbar.component';
import { FooterComponent } from './main-components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { BarmanModule } from './pages/barman/barman.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    HttpClientModule,
    BarmanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
