import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.router.events.subscribe((event) => {
      window.scrollTo(0, 0);
      if ((event instanceof NavigationStart)) {
        this.opened = false;
      }
    });
  }

  logOut() {
    this.authService.loggout();
  }

}
