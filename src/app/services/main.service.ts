import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask  } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  picture: any;

  constructor(private firebaseStorage: AngularFireStorage, private afDB: AngularFireDatabase, public snackBar: MatSnackBar) { }

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


  public UploadImage(event) {
    const name = event.target.files[0].name.replace(/\s+/g, '-').toLowerCase();
    const id = Date.now() + '-' + name;
    this.ref = this.firebaseStorage.ref('pics/' + id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then((result) => {
      this.openSnackBar('Subiendo Archivo', 'Ok');
      const url = this.firebaseStorage.ref('pics/' + id).getDownloadURL();
      url.subscribe((pic) => {
        this.SavePic(pic);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  public uploadFile(event) {
    const name = event.target.files[0].name.replace(/\s+/g, '-').toLowerCase();
    const id = Date.now() + '-' + name;
    this.ref = this.firebaseStorage.ref('files/' + id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.then((result) => {
      this.openSnackBar('Subiendo Archivo', 'Ok');
      const url = this.firebaseStorage.ref('files/' + id).getDownloadURL();
      url.subscribe((pdf) => {
        this.SaveFile(pdf, id);
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  public getPicList() {
    return this.afDB.list('data/uploads/pictures/');
  }

  public getFileList() {
    return this.afDB.list('data/uploads/files/');
  }

  SavePic(url) {
    const id = Date.now();
    this.afDB.database.ref('data/uploads/pictures/' + id).set(url)
      .then((response) => {
        this.openSnackBar('Guardada con exito', response);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  SaveFile(url, name) {
    const file = {
      id: Date.now(),
      name: name,
      url: url,
    };
    this.afDB.database.ref('data/uploads/files/' + file.id).set(file)
      .then((response) => {
        this.openSnackBar('Guardada con exito', response);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
