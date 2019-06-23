import { Action } from '@ngrx/store'
import { Product } from '../../models/product.model'
import * as ProductsActions from '../actions/products.actions';

export function productsReducer(state: Product[] = [], action: ProductsActions.Actions) {

    switch(action.type) {
        case ProductsActions.LOAD_PRODUCTS:
            return {...state, loading: true};
        case ProductsActions.LOAD_PRODUCTS_SUCCESS:
            return {products: action.payload, loading: false, loaded: true}
        default:
            return state;
    }
}