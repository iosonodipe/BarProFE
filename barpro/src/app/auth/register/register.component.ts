import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/i-user';
import { IBarman } from '../../models/i-barman';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerUserData: Partial<IUser> = {};
  registerBarmanData: Partial<IBarman> = {};
  isBarman: boolean = false;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  register() {
    if (this.isBarman) {
      // Copia i dati comuni da registerUserData a registerBarmanData
      this.registerBarmanData = {
        ...this.registerUserData,
        ...this.registerBarmanData
      } as Partial<IBarman>;

      console.log('Barman Data:', this.registerBarmanData); // Log dei dati barman

      this.authSvc.registerBarman(this.registerBarmanData).subscribe(
        data => this.router.navigate(['']),
        error => console.error('Barman registration failed', error) // Log dell'errore
      );
    } else {
      console.log('User Data:', this.registerUserData); // Log dei dati user

      this.authSvc.registerUser(this.registerUserData).subscribe(
        data => this.router.navigate(['']),
        error => console.error('User registration failed', error) // Log dell'errore
      );
    }
  }
}
