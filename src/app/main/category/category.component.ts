import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store/product.reducer';
import { cardProductList } from '../store/product.selectors';
import { Product } from 'src/app/model/product.model';
import { Observable } from 'rxjs';
import { addToCartAction } from '../store/product.action';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public id: string;
  jsonData: any;

  cartList$:| Observable<Product[]>

  constructor(
    public route: ActivatedRoute,
    public store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.url[ 1 ].path;
    this.route.params.subscribe(params => {
      this.id = params['id'];
       this.loadCategory();
    });
    this.cartList$ = this.store.select(cardProductList)
  }

  addToCart (item: Product) {
    this.store.dispatch(addToCartAction({ product: item }))
  }

  loadCategory() {
    axios.get('assets/products.json') 
      .then(response => {
        this.jsonData = response.data.filter((product: any ) => product.category == this.id);
      })
      .catch(error => {
        console.error('Не удалось загрузить файл', error);
      })
  }
}
