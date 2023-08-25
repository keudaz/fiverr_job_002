import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/product';

@Component({
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})

export class SingleProductComponent implements OnInit {

  product!:Product

  constructor() {}

  ngOnInit(): void {}

}
