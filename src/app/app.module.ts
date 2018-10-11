import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// Servicios
import { AuthService } from './services/auth.service';
import { MainService } from './services/main.service';
import { GuardService } from './services/guard.service';

// Angular Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Material
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';

// Componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SinginComponent } from './singin/singin.component';
import { AddPortfolioComponent } from './add-portfolio/add-portfolio.component';
import { ListPortafolioComponent } from './list-portafolio/list-portafolio.component';

// Routes
const appRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'singin', component: SinginComponent, canActivate: [GuardService] },
  { path: 'add-portfolio', component: AddPortfolioComponent, canActivate: [GuardService] },
  { path: 'portfolio', component: ListPortafolioComponent, canActivate: [GuardService] }
];

export const firebaseConfig = {
    apiKey: 'AIzaSyDkXbn2uVR9LvgdvLIpFxczRnSw6sK7q2U',
    authDomain: 'dm-web-f9313.firebaseapp.com',
    databaseURL: 'https://dm-web-f9313.firebaseio.com',
    projectId: 'dm-web-f9313',
    storageBucket: 'dm-web-f9313.appspot.com',
    messagingSenderId: '671565414794'
};


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    SinginComponent,
    AddPortfolioComponent,
    ListPortafolioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatSnackBarModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ AuthService, MainService, GuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
