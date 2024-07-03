import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyEventsRoutingModule } from './my-events-routing.module';
import { MyEventsComponent } from './my-events.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [MyEventsComponent],
  imports: [CommonModule, MyEventsRoutingModule, NgbModule],
})
export class MyEventsModule {}
