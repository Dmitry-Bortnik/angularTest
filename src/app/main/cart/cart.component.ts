import { Component } from '@angular/core';
import { ProductFilterService } from 'src/app/shared/directives/product-filter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends ProductFilterService  {

public sum: number;

getTotalPrice() {
    this.cartList$.subscribe(data => {
      if (data) {
        this.sum = data.reduce((acc: any, curr: any) => acc + curr.price, 0);
        console.log(this.sum);
        return this.sum;
      } else {
        return 0
      }
    })
  }
}
