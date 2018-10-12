import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private afDB: AngularFireDatabase, public snackBar: MatSnackBar) { }

  public addPortfolio(item) {
    this.afDB.database.ref('data/portfolio/' + item.id).set(item)
      .then((response) => {
        this.openSnackBar('Creado correctamente', response);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  public addPromo(item) {
    this.afDB.database.ref('data/promos/' + item.id).set(item)
      .then((response) => {
        this.openSnackBar('Creado correctamente', response);
        return true;
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
        return false;
      });
  }

  public getPortafolio() {
    return this.afDB.list('data/portfolio/');
  }
  public getPortafolioItem(id) {
    return this.afDB.object('data/portfolio/' + id);
  }
  public getPromos() {
    return this.afDB.list('data/promos/');
  }

  public getPromoItem(id) {
    return this.afDB.object('data/promos/' + id);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
