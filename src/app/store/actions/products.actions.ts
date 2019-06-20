import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';


export const LOAD_PRODUCTS = '[PRODUCTS] Load'
export const LOAD_PRODUCTS_SUCCESS = '[PRODUCTS] Load Success'

export class LoadProducts implements Action {
    readonly type = LOAD_PRODUCTS

    constructor() {}
}


export class LoadProductsSuccess implements Action {
    readonly type = LOAD_PRODUCTS_SUCCESS

    constructor(public payload: Product[]) {}
}

export type Actions = LoadProducts | LoadProductsSuccess
