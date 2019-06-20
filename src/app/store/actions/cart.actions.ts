import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { CartItem } from '../../models/cartitem.model';


export const ADD_CART_ITEM = '[CART_ITEM] Add'
export const REMOVE_CART_ITEM = '[CART_ITEM] Remove'
export const CHANGE_QUANTITY = '[CART_ITEM] Change Quantity'

export class AddCartItem implements Action {
    readonly type = ADD_CART_ITEM

    constructor(public payload: CartItem) {}
}

export class RemoveCartItem implements Action {
    readonly type = REMOVE_CART_ITEM

    constructor(public payload: number) {}
}

export class ChangeQuantity implements Action {
    readonly type = CHANGE_QUANTITY

    constructor(public payload: {index: number, quantity: number}) {}
}

export type Actions = AddCartItem | RemoveCartItem | ChangeQuantity
