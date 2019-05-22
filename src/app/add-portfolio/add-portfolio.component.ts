import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.css']
})
export class AddPortfolioComponent implements OnInit {

  id: string;
  ctaText: string = 'Agregar Item';
  title: string = 'Agregar item al portafolio';

  portafolio: any = {
    id: Date.now(),
  };

  claro: any = {};
  movistar: any = {};
  tigo: any = {};

  constructor(private mainService: MainService, private route: ActivatedRoute, router: Router) {

    router.events.subscribe((event) => {
      if ((event instanceof NavigationEnd)) {
        this.getId();
        this.getValues();
      }
    });

  }

  ngOnInit() {

  }

  getId() {
    this.id = this.route.snapshot.params['id'];
  }

  getValues() {
    if (this.id !== 'new') {
      this.title = 'Editar portafolio';
      this.ctaText = 'Actualizar Item';
      this.mainService.getPortafolioItem(this.id).valueChanges().subscribe(item => {
        this.portafolio = item;
        this.claro = this.portafolio.claro;
        this.movistar = this.portafolio.movistar;
        this.tigo = this.portafolio.tigo;
      });
    } else {
      this.ctaText = 'Agregar Item';
      this.title = 'Agregar item al portafolio';
      this.portafolio = {
        id: Date.now(),
      };
    }
  }

  add() {
    this.ctaText = 'Enviando ...';
    this.portafolio.claro = this.claro;
    this.portafolio.movistar = this.movistar;
    this.portafolio.tigo = this.tigo;

    this.mainService.addPortfolio(this.portafolio);

    if (this.id === 'new') {
      this.portafolio = {};
      this.ctaText = 'Agregar Item';
    } else {
      this.ctaText = 'Actualizar Item';
    }
  }
}
