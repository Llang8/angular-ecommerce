import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
// https://www.youtube.com/watch?v=xkUOQeGqIGI
@Injectable()
export class ProductsEffects {

    @Effect()
    loadProducts$ = createEffect(() => this.actions$.pipe(
            ofType('[PRODUCTS] Load'),
            mergeMap(() => this.productsService.getAllProducts()
                .pipe(
                    map(products => ({type: '[PRODUCTS] Load Success', payload: products})),
                    catchError(() => EMPTY)
                )
            )
        )
    );

    constructor(private actions$: Actions, private productsService: ProductService) {}

}