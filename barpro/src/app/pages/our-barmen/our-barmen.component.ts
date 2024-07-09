import { Component, OnInit } from '@angular/core';
import { IBarman } from '../../models/i-barman';
import { BarmanService } from '../barman/barman.service';
import { LoaderService } from '../../main-components/loader/loader.service';

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
  pageSizeOptions: number[] = [5, 10, 20, 50]; // Opzioni di dimensione della pagina

  constructor(private barmanService: BarmanService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loadBarmen();
  }

  loadBarmen(): void {
    this.loaderService.showLoading();
    this.barmanService.getAll(this.page, this.size, this.sortBy).subscribe(data => {

      setTimeout(() => {
        this.loaderService.hideLoading()
        this.barmen = data.content;
        this.totalPages = data.totalPages;
      }, 400)


    });
  }

  applyFilters(): void {
    this.page = 0; // Reset page to 0 whenever filters are applied
    this.loadBarmen();
  }

  changePage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.page = page;
      if (this.sortBy === 'city' && this.city) {
        this.barmanService.getByCity(this.page, this.size, this.city).subscribe(data => {
          this.barmen = data.content;
          this.totalPages = data.totalPages;
        });
      } else {
        this.loadBarmen();
      }
    }
  }
}
