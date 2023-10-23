import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/main/store/product.reducer';
import { cardProductList } from 'src/app/main/store/product.selectors';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  jsonData: any;
  cartList$:| Observable<Product[]>

  constructor(
    public store: Store<AppState>
  ) {}

  
  ngOnInit(): void {
    this.loadCategory();
    this.cartList$ = this.store.select(cardProductList)
  }

  loadCategory() {
    axios.get('assets/category.json') 
      .then(response => {
        this.jsonData = response.data;
      })
      .catch(error => {
        console.error('Не удалось загрузить файл', error);
      })
  }
}
