import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})

export class FetchProductsService {

  dburl = 'https://albertodemaria.github.io/jsonDB/es_def.json';

  constructor(private http: HttpClient) { }

  fetchProducts(): Observable<Product[]> {
    const url = this.dburl;
    return this.http.get<Product[]>(url);
  }

  fetchProductsByCollection(collection:string): Observable<Product[]> {
    const url = this.dburl;
    return this.http.get<Product[]>(url).pipe(
      map(products => products.filter(product => product.collection === collection))
    );
  }

}
