import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';
import * as ProductsActions from '../store/actions/products.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  allProducts: Product[];
  products: Product[];

  constructor(private store: Store<AppState>) {
    store.dispatch(new ProductsActions.LoadProducts())
    store.select('products')
      .subscribe(data => {
        console.log(data);
        if (data['loaded']) {
          console.log(data);
          this.allProducts = data['products'];
          this.products = data['products'];
        } else {
          console.log('Not loaded')
        }
      })
  }

  ngOnInit() {
  }

  /* 
  * Sends query from search bar, splits it into an
  * array of words. Checks both title and description
  * of all products and removes from view if it isn't
  * in the title/description
  */
  search(query) {
    let queryWords = query.toLowerCase().split(" ");
    this.products = this.allProducts.filter((product) => {
      for( let i = 0; i < queryWords.length; i++) {
        if(!product.title.toLowerCase().includes(queryWords[i])) {
          if(!product.description.toLowerCase().includes(queryWords[i]))
            return false;
        }
      }
      return true;
    })
  }
  

  /* 
  * Perform custom sort based on
  * selected value in sort by
  * dropdown menu.
  */
  sortProducts(value) {

    // If sort type is featured sort by featured score
    if (value == 'featured') {
      this.products.sort((a,b) => {
        return b.featured - a.featured
      })
    }
    // If sort type is best-selling sort by best-selling
    else if(value == 'best-selling') {
      this.products.sort((a,b) => {
        return b.sales - a.sales;
      });
    }
    // If alphabetical_AZ sort alphabetically
    else if(value == 'alphabetically_AZ') {
      this.products.sort((a,b) => {
        if(a.title > b.title)
          return 1;
        else if (a.title < b.title)
          return -1;
        else
          return 0;
      })
    }
    // If alphabetical_ZA sort alphabetically backwards
    else if(value == 'alphabetically_ZA') {
      this.products.sort((a,b) => {
        if(a.title > b.title)
          return -1;
        else if (a.title < b.title)
          return 1;
        else
          return 0;
      })
    }
    // If price_lowhigh sort by price ascending
    else if(value == 'price_lowhigh') {
      this.products.sort((a,b) => {
        return a.price - b.price; 
      })
    }
    // If price_highlow sort by price descending
    else if(value == 'price_highlow') {
      this.products.sort((a,b) => {
        return b.price - a.price;
      })
    }

  }
}
