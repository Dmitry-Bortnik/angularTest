import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { CategoryComponent } from './main/category/category.component';
import { CommonModule } from '@angular/common';
import { CartComponent } from './main/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'main',  runGuardsAndResolvers: 'always', },
  { path: 'main', component: HomeComponent,  runGuardsAndResolvers: 'always', },
  { path: 'category/:id', component: CategoryComponent},
  { path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
