import { createReducer, on } from "@ngrx/store";
import { Product } from "src/app/model/product.model";
import { addToCartAction, loadProduct, removeFromCart } from "./product.action";

export interface AppState {
    product: Product[];
    cart: Product[];
}

const initialState: AppState = {
    product: [],
    cart: [],
}

export const productReducer = createReducer(initialState,
    on(loadProduct, (state, { productList }) => ({...state, product: productList})),
    on(addToCartAction, (state, { product }) => ({ ...state, cart: [ ...state.cart, product] }))
);