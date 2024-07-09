import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faAngleUp, faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  isUser: boolean = false;
  isBarman: boolean = false;
  isUserLoggedIn: boolean = false;
  linkedin = faLinkedin
  github = faGithub
  arrow = faAngleUp

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

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
