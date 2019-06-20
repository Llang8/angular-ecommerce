import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductSpotlightComponent } from './product-spotlight/product-spotlight.component';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SettingsComponent } from './settings/settings.component';
import { CartComponent } from './cart/cart.component';
import { StoreModule } from '@ngrx/store';
import { cartReducer } from './store/reducers/cart.reducers';
import { productsReducer } from './store/reducers/products.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/effects/products.effect';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductSpotlightComponent,
    AccountComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      cart: cartReducer,
      products: productsReducer
    }),
    EffectsModule.forRoot([ProductsEffects]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
