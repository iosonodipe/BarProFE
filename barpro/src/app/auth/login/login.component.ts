import { Component } from '@angular/core';
import { ILoginData } from '../../models/i-login-data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: ILoginData = {
    username: '',
    password: ''
  };

  constructor(
    private authSvc: AuthService,
    private router: Router
  ) {}

  login() {
    this.authSvc.login(this.loginData).subscribe({
      error: err => {
        Swal.fire('Errore di Login', err.error.message || 'Username o password errati, per favore riprova.', 'error');
      }
    });
  }
}
