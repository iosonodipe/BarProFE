import { Component } from '@angular/core';
import { BarmanService } from './barman.service';
import { IBarman } from '../../models/i-barman';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barman',
  templateUrl: './barman.component.html',
  styleUrl: './barman.component.scss'
})
export class BarmanComponent {

  constructor(barmanSvc: BarmanService, private router: ActivatedRoute) {
    this.router.params.subscribe(params => {
      const id = +params['id']; // Converti il parametro ID a numero
      barmanSvc.getById(id).subscribe(barman => this.barman = barman);
    });
  }

  barman: IBarman = {
    experienceYears: 0,
    description: '',
    rating: 0,
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    city: '',
    avatar: '/assets/img/avatardefault_92824.webp'
  }
}
