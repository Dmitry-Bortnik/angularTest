import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { Observable, Subscription, map, startWith, tap } from 'rxjs';
import { AppState } from 'src/app/main/store/product.reducer';
import { cardProductList, productList } from 'src/app/main/store/product.selectors';
import { Product } from 'src/app/model/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductFilterService implements OnInit  {

  cartList$:| Observable<Product[]>

  private categores = [];
  public filteredCategores: Observable<string[]>

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<AppState>
  ) {
    this.route.params.subscribe((res) => {
      this.init();
    })
  }
  
  ngOnInit(): void {
    this.cartList$ = this.store.select(cardProductList);
  }


  public filterForm: FormGroup;

  public initFilter() {
    this.filterForm = new FormGroup({
      productName: new FormControl(this.route.snapshot.params.productName == undefined ? '' : this.route.snapshot.params.productName),
      productCategory: new FormControl(this.route.snapshot.params.productCategory == undefined ? '' : this.route.snapshot.params.productCategory),
    })

    this.getCategores();
    this.setFilterAndUpdate();
  }

  public search = () => {
    this.router.navigate(
      ['/' + this.route.snapshot.routeConfig?.path,
        {
          productName: this.filterForm.value.productName = undefined ? '' : this.filterForm.value.productName,
          productCategory: this.filterForm.value.productCategory = undefined ? '' : this.filterForm.value.productCategory
        }
      ]
    )
  }

  public setFilter() {
    this.filterForm.setValue({
      productName: this.route.snapshot.params.productName == undefined ? '' : this.route.snapshot.params.productName,
      productCategory: this.route.snapshot.params.productCategory == undefined ? '' : this.route.snapshot.params.productCategory
    })
  }

 public getCategoryIdByName(name: string) {
  if (!name) 
    return 0;
  let category = this.categores.find(category => category['name'] === name);
  return category === undefined ? 0 : category['id'];
 }

  private categoryFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.categores.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue))
  }

  private getCategores = () => {
    axios.get('assets/category.json') 
      .then(response => {
        this.categores = response.data;
        this.filteredCategores = this.filterForm.controls.productCategory.valueChanges.pipe(
          startWith(''), map(value => this.categoryFilter(value))
        )
      })
      .catch(error => {
        console.error('Не удалось загрузить файл', error);
      })
  }

  public setFilterAndUpdate() {}

  public init() {}

}
