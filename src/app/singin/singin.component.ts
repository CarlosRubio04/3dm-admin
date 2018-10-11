import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  registerParams: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  createUser() {
    this.authService.singin(this.registerParams);
  }

}
