import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PhotoEffectSettingService } from './photo-effect-setting.service';
import { EditHeaderService } from 'src/app/services/edit-header.service';
import { FetchProductsService } from 'src/app/services/fetch-products.service';
import { Product } from 'src/app/interface/product';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private photoEffectSrv:PhotoEffectSettingService, private editHeaderSrv:EditHeaderService, private fetchProductsSrv:FetchProductsService) { }

  @ViewChild('first', { static: false }) firstElement: ElementRef | undefined;
  @ViewChild('second', { static: false }) secondElement: ElementRef | undefined;

  showOctagon:boolean = false;
  currentTime: Date = new Date();
  productsName!: string[];
  productName: string = "LOADING...";
  productSubscription: Subscription | undefined;

  ngOnInit(): void {
    // update time
    setInterval(() => { this.currentTime = new Date(); }, 1000);

    setInterval(() => {
      this.showOctagon = !this.showOctagon;
    }, 700)

    this.fetchProduct();
  }

  fetchProduct(){
    this.productSubscription = this.fetchProductsSrv.fetchProducts().subscribe(
      (data:Product[]) => {
        this.productsName = data.map(product => product.nome);

        // Remove duplicate
        this.productsName = this.productsName.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        this.startTypingProductName();
      },
      error => {
        console.error("Errore durante la richiesta HTTP:", error);
      }
    );
  }

  ngAfterViewInit(){
    // avoid no-photo at the start
    this.photoEffect();

    setInterval(() => { this.photoEffect(); }, 2000);
  }

  // -- NAME TYPING --
  async startTypingProductName() {
    while (true) {
      for (const product of this.productsName) {
        this.productName = '';
        for (let i = 0; i < product.length; i++) {
          this.productName += product[i];
          await this.delay(75); // Writing speed
        }
        await this.delay(1000); // Waiting before delete
        for (let i = product.length; i >= 0; i--) {
          this.productName = product.substr(0, i);
          await this.delay(50); // Delete speed
        }
      }
    }
  }

  async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // -- DARK MODE --
  darkMode:boolean = false;

  activeDarkMode(){
    this.darkMode = true;
    this.editHeaderSrv.updateDarkMode(true);
  }

  disactiveDarkMode(){
    this.darkMode = false;
    this.editHeaderSrv.updateDarkMode(false);
  }

  // -- PHOTO EFFECT --
  photoEffectSetting = this.photoEffectSrv.exportSetting();

  index:number = 0;

  firstPhotoCounter = 1;
  secondPhotoCounter = 2;
  mobilePhotoCounter = 1;

  photoEffect() {
    // -- DESKTOP --
    if (window.innerWidth >= 768) {
      if (this.index >= this.photoEffectSetting.length) {
        this.index = 0;
      }

      const currentSetting = this.photoEffectSetting[this.index];

      const firstElementStyle = this.firstElement?.nativeElement.style;
      const secondElementStyle = this.secondElement?.nativeElement.style;

      if (firstElementStyle) {
        firstElementStyle.width = `${currentSetting.first.width}px`;
        firstElementStyle.height = `${currentSetting.first.height}px`;
        firstElementStyle.top = `${currentSetting.first.top}%`;
        firstElementStyle.left = `${currentSetting.first.left}%`;
      }

      if (secondElementStyle) {
        secondElementStyle.width = `${currentSetting.second.width}px`;
        secondElementStyle.height = `${currentSetting.second.height}px`;
        secondElementStyle.bottom = `${currentSetting.second.bottom}%`;
        secondElementStyle.right = `${currentSetting.second.right}%`;
      }

      this.firstPhotoCounter += 2;
      if (this.firstPhotoCounter > 69) {
        this.firstPhotoCounter = 1;
      }

      this.secondPhotoCounter += 2;
      if (this.secondPhotoCounter > 68) {
        this.secondPhotoCounter = 2;
      }

      this.index++;

      // -- MOBILE --
    } else {
      this.mobilePhotoCounter += 1;
      if (this.mobilePhotoCounter > 68) {
        this.mobilePhotoCounter = 1;
      }
    }
  }

  ngOnDestroy(){
    this.editHeaderSrv.updateDarkMode(false);

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
