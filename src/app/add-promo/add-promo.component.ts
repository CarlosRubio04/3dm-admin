import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-add-promo',
  templateUrl: './add-promo.component.html',
  styleUrls: ['./add-promo.component.css']
})
export class AddPromoComponent implements OnInit {

  id: string;
  ctaText: string = 'Agregar Promo';
  title: string = 'Agregar promo';

  promo: any = {
    id: Date.now(),
  };

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
      this.title = 'Editar promo';
      this.ctaText = 'Actualizar promo';
      this.mainService.getPromoItem(this.id).valueChanges().subscribe(item => {
        this.promo = item;
      });
    } else {
      this.ctaText = 'Agregar promo';
      this.title = 'Agregar promo';
      this.promo = {
        id: Date.now(),
      };
    }
  }

  add() {
    this.ctaText = 'Enviando ...';
    this.mainService.addPromo(this.promo);
    if (this.id === 'new') {
      this.promo = {};
      this.ctaText = 'Agregar Item';
    } else {
      this.ctaText = 'Actualizar Item';
    }
  }

}
