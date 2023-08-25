import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChangeLanguagesService } from './services/change-languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'ES';

  constructor(private translateSrv:TranslateService, private changeLanguagesSrv:ChangeLanguagesService){
    this.translateSrv.addLangs(this.changeLanguagesSrv.supportLanguages);
    this.translateSrv.use('en');
  }
}
