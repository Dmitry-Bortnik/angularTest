import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product.model";

export const loadProduct = createAction('[PRODUCT] load product', props<{productList: Product[]}>())
export const addToCartAction = createAction('[PRODUCT] add product', props<{product: Product}>())
export const removeFromCart = createAction('[PRODUCT] remove product', props<{product: Product}>())