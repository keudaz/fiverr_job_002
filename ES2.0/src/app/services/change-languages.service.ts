import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChangeLanguagesService {

  constructor(private translateSrv: TranslateService) {}

  supportLanguages = ['en', 'it'];
  private langSubject = new BehaviorSubject<string>(this.translateSrv.currentLang);

  langInUse$ = this.langSubject.asObservable();

  changeLang(lang: string) {
    this.translateSrv.use(lang);
    this.langSubject.next(lang);
  }

}
