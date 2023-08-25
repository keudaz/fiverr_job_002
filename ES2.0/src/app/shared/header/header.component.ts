import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChangeLanguagesService } from 'src/app/services/change-languages.service';
import { EditHeaderService } from 'src/app/services/edit-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isDarkMode: boolean = this.editHeaderSrv.darkMode;
  headerBg =  this.editHeaderSrv.bgColor;
  supportLanguages = this.changeLanguagesSrv.supportLanguages;

  private bgColorSubscription: Subscription | undefined;
  private darkModeSubscription: Subscription | undefined;
  private langInUseSubscription: Subscription | undefined;

  langInUse: string = '';

  constructor(private editHeaderSrv: EditHeaderService, private changeLanguagesSrv:ChangeLanguagesService) {}

  ngOnInit(): void {
    this.bgColorSubscription = this.editHeaderSrv.bgColorChanged.subscribe(newColor => {
      if(newColor == ""){
        this.headerBg = "";
      } else {
        this.headerBg = '#' + newColor;
      }
    });

    this.darkModeSubscription = this.editHeaderSrv.darkModeChanged.subscribe(newDarkMode => {
      this.isDarkMode = newDarkMode;
    });

    this.langInUseSubscription = this.changeLanguagesSrv.langInUse$.subscribe(lang => {
      this.langInUse = lang;
    });

    this.langInUse = "en";
  }

  changeLanguage(lang:string){
    this.changeLanguagesSrv.changeLang(lang);
  }

  ngOnDestroy(): void {
    if (this.bgColorSubscription) {
      this.bgColorSubscription.unsubscribe();
    }
    if (this.darkModeSubscription) {
      this.darkModeSubscription.unsubscribe();
    }
  }

}
