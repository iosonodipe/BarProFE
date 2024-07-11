import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IBarman } from '../../../models/i-barman';
import { BarmanService } from '../barman.service';

@Component({
  selector: 'app-barman-card',
  templateUrl: './barman-card.component.html',
  styleUrl: './barman-card.component.scss'
})
export class BarmanCardComponent {
  @Input() barman!: IBarman
  @Output() cardClick = new EventEmitter<void>();

  onCardClick(): void {
    this.cardClick.emit();
  }

  constructor(private barmanSvc: BarmanService) { }


}
