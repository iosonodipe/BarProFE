import { Component } from '@angular/core';
import { BarmanService } from '../barman/barman.service';
import { IBarman } from '../../models/i-barman';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private barmanSvc: BarmanService) {
    barmanSvc.$barmen.subscribe(barman => this.topBarmen = this.getRandomTopRatedBarmen(barman));
  }

  topBarmen: IBarman[] = [];

  getRandomTopRatedBarmen(barmen: IBarman[], count: number = 5): IBarman[] {
    // Ordina i barman in ordine decrescente di rating
    const sortedBarmen = barmen.sort((a, b) => b.rating - a.rating);

    // Se il numero di barman è inferiore a 5, restituisci tutti i barman
    if (sortedBarmen.length <= count) {
      return sortedBarmen;
    }

    // Altrimenti, restituisci i primi 'count' barman
    return sortedBarmen.slice(0, count);
  }
}
