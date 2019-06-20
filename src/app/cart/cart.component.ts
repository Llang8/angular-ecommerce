import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { CartItem } from '../models/cartitem.model';
import * as CartActions from '../store/actions/cart.actions';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  loggedIn: boolean;
  cart: Observable<CartItem[]>;

  constructor(private store: Store<AppState>) {
    // In future check user session for boolean value
    this.loggedIn = true;

    this.cart = store.select('cart');

  }

  updateQty(index,value) {
    console.log(value);
    this.store.dispatch(new CartActions.ChangeQuantity({index:index,quantity: value}));
  }

  ngOnInit() {
  }

}
