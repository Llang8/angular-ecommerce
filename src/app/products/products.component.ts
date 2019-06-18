import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  allProducts: any
  products: any

  constructor() {
    // Temporary Products list until database is set up
    this.allProducts = [{
      id: 1,
      title: 'Gaming Keyboard 1',
      category: 'Keyboards',
      thumbnail: 'https://assets.pcmag.com/media/images/484033-corsair-strafe-mechanical-gaming-keyboard.jpg?thumb=y&width=333&height=246',
      description: 'keyboard has green keys',
      sales: 7,
      featured: 4,
      price: 255
    },
    {
      id: 2,
      title: 'Gaming Keyboard 2',
      category: 'Keyboards',
      thumbnail: 'https://assets.pcmag.com/media/images/484033-corsair-strafe-mechanical-gaming-keyboard.jpg?thumb=y&width=333&height=246',
      description: 'keyboard has blue keys',
      sales: 3,
      featured: 2,
      price: 100
    },
    {
      id: 3,
      title: 'Gaming Keyboard 3',
      category: 'Keyboards',
      thumbnail: 'https://assets.pcmag.com/media/images/484033-corsair-strafe-mechanical-gaming-keyboard.jpg?thumb=y&width=333&height=246',
      description: 'keyboard has red keys',
      sales: 1,
      featured: 1,
      price: 144
    },
    {
      id: 4,
      title: 'Gaming Mouse 1',
      category: 'Mice',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/61d9C4yCB2L._SX466_.jpg',
      description: 'Mouse is blue',
      sales: 10,
      featured: 2,
      price: 100
    },
    {
      id: 5,
      title: 'Gaming Mouse 2',
      category: 'Mice',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/61d9C4yCB2L._SX466_.jpg',
      description: 'Mouse is red',
      sales: 25,
      featured: 5,
      price: 110
    },
    {
      id: 6,
      title: 'Gaming Mouse 3',
      category: 'Mice',
      thumbnail: 'https://images-na.ssl-images-amazon.com/images/I/61d9C4yCB2L._SX466_.jpg',
      description: 'Mouse is orange',
      sales: 20,
      featured: 3,
      price: 125
    }]

    this.products = this.allProducts;
    document.getElementById
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
