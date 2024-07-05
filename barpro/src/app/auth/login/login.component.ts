import { Component } from '@angular/core';
import { ILoginData } from '../../models/i-login-data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData:ILoginData = {
    username: '',
    password: ''
  }

  constructor(
    private authSvc:AuthService,
    private router:Router
    ){}

    login(){

      this.authSvc.login(this.loginData)
      .subscribe(data => {
        if(this.authSvc.isBarman()) this.router.navigate(['/my-events'])
        else this.router.navigate([''])
      })

    }
}
