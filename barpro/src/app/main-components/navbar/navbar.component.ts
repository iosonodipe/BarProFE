import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isUserLoggedIn: boolean = false;
  isUser: boolean = false;
  isBarman: boolean = false;
  faBars = faBars
  isNavbarCollapsed = true;

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
