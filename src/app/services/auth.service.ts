import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFireDatabase,
    public snackBar: MatSnackBar) { }

  public login = (paramas) => {
    this.angularFireAuth.auth.signInWithEmailAndPassword(paramas.email, paramas.password)
      .then((response) => {
        this.openSnackBar('Bienvenido', response.user.email);
        setTimeout(() => {
          this.router.navigate(['dashboard']);
        }, 800);
      })
      .catch((error) => {
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  public singin = (user) => {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((response) => {
        const userData = {
          name: user.name,
          uid: response.user.uid,
          email: response.user.email
        };
        this.addUser(userData);
        setTimeout(() => {
          this.openSnackBar('Usuario creado', response.user.email);
        }, 500);
      })
      .catch((error) => {
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  public getUsers() {
    return this.afDB.list('users/');
  }
  public addUser(user) {
    this.afDB.database.ref('users/' + user.uid).set(user)
      .then((response) => {
        this.openSnackBar('Usuario Creado', response);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  public updateUser(user) {
    this.afDB.database.ref('users/' + user.uid).update(user)
      .then((response) => {
        this.openSnackBar('Usuario Actualizado', response);
      })
      .catch((error) => {
        console.log(error);
        this.openSnackBar(error, 'Intentar de nuevo');
      });
  }

  public isLogged() {
    return this.angularFireAuth.authState;
  }

  public loggout() {
    this.angularFireAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  public getUser() {
    return this.angularFireAuth.auth;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
