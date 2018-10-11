import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent implements OnInit {
  portafolio: any = {
    id: Date.now(),
  };

  constructor(private mainService: MainService) { }

  ngOnInit() {
  }

  add() {
    this.mainService.addPortfolio(this.portafolio);
  }
}
