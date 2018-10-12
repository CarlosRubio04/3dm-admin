import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-list-promos',
  templateUrl: './list-promos.component.html',
  styleUrls: ['./list-promos.component.css']
})
export class ListPromosComponent implements OnInit {

  items: any = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getPromos().valueChanges().subscribe(items => {
      this.items = items;
      console.log(this.items);
    });
  }

}
