import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EditHeaderService {
  bgColor: string = "";
  bgColorChanged = new Subject<string>();

  darkMode: boolean = false;
  darkModeChanged = new Subject<boolean>();

  setBgColor(newColor: string) {
    this.bgColor = newColor;
    this.bgColorChanged.next(newColor);
  }

  updateDarkMode(newDarkMode: boolean) {
    this.darkMode = newDarkMode;
    this.darkModeChanged.next(newDarkMode);
  }

  resetBackground(){
    this.bgColor = '';
    this.bgColorChanged.next('');
  }
}
