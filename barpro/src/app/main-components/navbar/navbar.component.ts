import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isUserLoggedIn: boolean = false;
  isUser: boolean = false;
  isBarman: boolean = false;

  constructor(private authSvc:AuthService){}

  ngOnInit(){
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
    })
    this.authSvc.isUser$.subscribe(data => {
      this.isUser = data;
    })
    this.authSvc.isBarman$.subscribe(data => {
      this.isBarman = data;
    })
  }

  logout(){
    this.authSvc.logout()

  }
}
