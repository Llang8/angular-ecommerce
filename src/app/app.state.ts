import { CartItem } from './models/cartitem.model';
import { Product } from './models/product.model';

export interface AppState {
  readonly cart: CartItem[];
  readonly products: Product[];
}