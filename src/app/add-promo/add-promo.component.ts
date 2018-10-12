import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {
  promo: any = {
    id: Date.now(),
  };

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  add() {
    this.mainService.addPromo(this.promo);
  }

}
