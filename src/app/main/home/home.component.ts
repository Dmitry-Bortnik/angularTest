import { Component } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/app/model/product.model';
import { ProductFilterService } from 'src/app/shared/directives/product-filter.service';
import { addToCartAction } from '../store/product.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ProductFilterService  {
  jsonData: any = [];

  public override init(): void {
      this.initFilter();
  }

  public override setFilterAndUpdate() {
    this.setFilter();
    this.loadCategory();
  }

  addToCart (item: Product) {
    this.store.dispatch(addToCartAction({ product: item }))
  }

  public loadCategory() {
    axios.get('assets/products.json') 
      .then(response => {
        this.jsonData = response.data;
        const productName = this.filterForm.value.productName;
        if (productName != '')
          this.jsonData = this.jsonData.filter((item: { name: string; }) => item.name == productName);
        if (this.getCategoryIdByName(this.filterForm.value.productCategory) != 0) {
          const categoryId = this.getCategoryIdByName(this.filterForm.value.productCategory)
          this.jsonData = this.jsonData.filter((item: {category: number}) => item.category == categoryId);
        }
        return this.jsonData
      })
      .catch(error => {
        console.error('Не удалось загрузить файл', error);
      })
  }
}
