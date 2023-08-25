import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interface/product';
import { FetchProductsService } from 'src/app/services/fetch-products.service';

@Component({
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit, OnDestroy {

  products!: Product[];
  productsEclissi!: Product[];

  constructor(private fetchProductsSrv:FetchProductsService) { }

  ngOnInit(): void {
    this.fetchProduct();
  }

  productSubscription: Subscription | undefined;
  eclissiProductSubscription: Subscription | undefined;
  fetchProduct(){
    this.productSubscription = this.fetchProductsSrv.fetchProductsByCollection("").subscribe(
      (data:Product[]) => {
        this.products = data;
      },
      error => {
        console.error("Errore durante la richiesta HTTP:", error);
      }
    );

    this.eclissiProductSubscription = this.fetchProductsSrv.fetchProductsByCollection("eclissi").subscribe(
      (data:Product[]) => {
        this.productsEclissi = data;
      },
      error => {
        console.error("Errore durante la richiesta HTTP:", error);
      }
    );
  }

  // -- TYPING --
  productName:string = 'HOVER A PRODUCT';
  productOnHover(name: string): void {
    this.productName = "";
    this.startTyping(name);
  }

  private typingTimeout: any;
  startTyping(name: string) {
    let i = 0;
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setInterval(() => {
      if (i < name.length) {
        this.productName += name.charAt(i);
        i++;
      } else {
        clearInterval(this.typingTimeout);
      }
    }, 50);
  }

  // -- FILTERS --
  showFilters:boolean = false;
  filterProducts(typo:string){}

  ngOnDestroy(){
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

}
