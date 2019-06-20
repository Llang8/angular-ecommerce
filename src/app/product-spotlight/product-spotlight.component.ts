import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem } from '../models/cartitem.model';
import { AppState } from '../app.state';
import * as CartActions from '../store/actions/cart.actions';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-spotlight',
  templateUrl: './product-spotlight.component.html',
  styleUrls: ['./product-spotlight.component.scss']
})
export class ProductSpotlightComponent implements OnInit {

  // Product id number
  id: number;
  quantity: number = 1;
  product: Product;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit() {
    // Get id route param
    this.route.params.subscribe(params => {
      this.id = +params['id'] // + converts string 'id' to number
    })

    // IN FUTURE MAKE REQUEST TO SERVICE TO GET PRODUCT DATA
    this.product = {
      id: 3,
      title: 'Gaming Keyboard 3',
      category: 'Keyboards',
      thumbnail: 'https://assets.pcmag.com/media/images/484033-corsair-strafe-mechanical-gaming-keyboard.jpg?thumb=y&width=333&height=246',
      description: 'keyboard has red keys',
      sales: 1,
      featured: 1,
      price: 144
    }
  }

  addQuantity(value) {
    this.quantity += value;

    // Don't let quantity go below 1
    if(this.quantity < 1) {
      this.quantity = 1;
    // Don't let quantity go above 50
    } else if (this.quantity > 50) {
      this.quantity = 50;
    }
  }

  addToCart() {
    this.store.dispatch(new CartActions.AddCartItem({
      id: this.product.id,
      title: this.product.title,
      thumbnail: this.product.thumbnail,
      price: this.product.price,
      quantity: this.quantity,
      total: this.product.price * this.quantity
    }))
  }

}
