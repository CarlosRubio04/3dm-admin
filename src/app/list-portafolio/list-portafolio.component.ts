import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
@Component({
  selector: 'app-list-portafolio',
  templateUrl: './list-portafolio.component.html',
  styleUrls: ['./list-portafolio.component.css']
})
export class ListPortafolioComponent implements OnInit {

  items: any = [];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getPortafolio().valueChanges().subscribe( items => {
      this.items = items;
      console.log(this.items);
    });
  }

}
