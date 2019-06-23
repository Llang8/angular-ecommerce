import { CartItem } from './models/cartitem.model';
import { Product } from './models/product.model';
import { User } from './models/user.model';


export interface AppState {
  readonly cart: CartItem[];
  readonly products: Product[];
  readonly isAuthenticated: boolean;
  readonly user: User | null;
  readonly errorMessage: string | null;
}