import { Component, HostListener } from '@angular/core';
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
  lastScrollTop = 0;


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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > this.lastScrollTop) {
        // Scroll down
        navbar.classList.remove('navbar-visible');
        navbar.classList.add('navbar-hidden');
      } else {
        // Scroll up
        navbar.classList.remove('navbar-hidden');
        navbar.classList.add('navbar-visible');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }

}
