import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoEffectSettingService {
  constructor() {}

  photosValue = [
    { first: { width: 300, height: 200, top: 50, left: 5 }, second: { width: 280, height: 400, bottom: 20, right: 10 } },
    { first: { width: 350, height: 250, top: 10, left: 15 }, second: { width: 400, height: 230, bottom: 10, right: 10 } },
    { first: { width: 280, height: 400, top: 30, left: 10 }, second: { width: 300, height: 250, bottom: 50, right: 15 } },
    { first: { width: 400, height: 350, top: 10, left: 15 }, second: { width: 200, height: 300, bottom: 10, right: 5 } },
    { first: { width: 350, height: 400, top: 28, left: 5 }, second: { width: 250, height: 350, bottom: 40, right: 5 } },
    { first: { width: 280, height: 350, top: 35, left: 15 }, second: { width: 320, height: 250, bottom: 15, right: 10 } },
    { first: { width: 300, height: 300, top: 25, left: 5 }, second: { width: 350, height: 350, bottom: 25, right: 5 } },
    { first: { width: 350, height: 200, top: 40, left: 10 }, second: { width: 250, height: 400, bottom: 20, right: 15 } },
    { first: { width: 300, height: 250, top: 10, left: 5 }, second: { width: 280, height: 350, bottom: 10, right: 20 } }
  ];

  exportSetting(){
    return this.photosValue;
  }
}
