import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened: boolean;
  userData: any = {
    name: 'loading...',
    email: 'loading...',
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      window.scrollTo(0, 0);
      if ((event instanceof NavigationStart)) {
        this.opened = false;
      }
    });
    const user = this.authService.getUser();
    setInterval(() => this.authService.getUserData(user.currentUser.uid).valueChanges().subscribe( res => {
      this.userData = res;
    }), 2000);
  }

  logOut() {
    this.authService.loggout();
  }


}
