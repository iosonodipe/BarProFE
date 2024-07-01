import { Component, OnInit } from '@angular/core';
import { IBarman } from '../../models/i-barman';
import { BarmanService } from '../barman/barman.service';

@Component({
  selector: 'app-our-barmen',
  templateUrl: './our-barmen.component.html',
  styleUrls: ['./our-barmen.component.scss']
})
export class OurBarmenComponent implements OnInit {
  barmen: IBarman[] = [];
  page: number = 0;
  size: number = 10;
  sortBy: string = 'id';
  city: string = '';
  totalPages: number = 0;

  constructor(private barmanService: BarmanService) {}

  ngOnInit(): void {
    this.loadBarmen();
  }

  loadBarmen(): void {
    this.barmanService.getAll(this.page, this.size, this.sortBy).subscribe(data => {
      this.barmen = data.content;
      this.totalPages = data.totalPages;
    });
  }

  applyFilters(): void {
    if (this.sortBy === 'city' && this.city) {
      this.barmanService.getByCity(this.page, this.size, this.city).subscribe(data => {
        this.barmen = data.content;
        this.totalPages = data.totalPages;
      });
    } else {
      this.loadBarmen();
    }
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      this.applyFilters();
    }
  }
}
