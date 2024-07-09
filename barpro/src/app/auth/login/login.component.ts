import { Component } from '@angular/core';
import { ILoginData } from '../../models/i-login-data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { LoaderService } from '../../main-components/loader/loader.service';

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
    private router: Router,
    private loaderService: LoaderService
  ) {}

  login() {
    this.loaderService.showLoading();
    this.authSvc.login(this.loginData).subscribe({
      next: () => {
        setTimeout(() => {
          this.loaderService.hideLoading()
        }, 400)
      },
      error: err => {
        Swal.fire('Errore di Login', err.error.message || 'Username o password errati, per favore riprova.', 'error');
        this.loaderService.hideLoading();
      }
    });
  }
}

