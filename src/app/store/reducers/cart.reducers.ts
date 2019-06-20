import { Action } from '@ngrx/store'
import { CartItem } from '../../models/cartitem.model'
import * as CartActions from './../actions/cart.actions'

export function cartReducer(state: CartItem[] = [], action: CartActions.Actions) {

    switch(action.type) {
        case CartActions.ADD_CART_ITEM:
            return [...state, action.payload];
        case CartActions.REMOVE_CART_ITEM:
            const removeIndex = action.payload;
            return [...state.splice(0, removeIndex), ...state.splice(removeIndex+1)]
        case CartActions.CHANGE_QUANTITY:
            const updateIndex = action.payload.index;
            const quantity = action.payload.quantity;
            var item = state[updateIndex];
            item.quantity = quantity;
            item.total = item.price * quantity;
            return [...state.splice(0,updateIndex), item, ...state.splice(updateIndex + 1)]
        default:
            return state;
    }
}