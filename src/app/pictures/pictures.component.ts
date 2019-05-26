import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {
  Images: any = [];

  constructor(private mainService: MainService, private snak: MatSnackBar) { }

  ngOnInit() {
    this.mainService.getPicList().valueChanges().subscribe( items => {
      this.Images = items;
    });
  }

  fileChangeEvent(event: any): void {
    if (event.target.files[0].size <= 1200000) {
      this.mainService.UploadImage(event);
    } else {
      this.openSnackBar('El archivo exede el peso limite', event.target.files[0].size + '/KB');
    }
  }

  openSnackBar(message: string, action: string) {
    this.snak.open(message, action, {
      duration: 2000,
    });
  }

  copyUrl(val: string) {
    let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = val;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }



}

