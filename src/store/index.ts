import { createStore } from "vuex";
import { user } from "./user";
import { Product } from "@/models/product";
import cartModule from "./cart";
import productsModule from "./products";

export interface IState {
  authProduct: Product | null; 
}

export default createStore<IState>({
  state: {
    authProduct: null
  },
  modules: {
    user,
    cart: cartModule,
    products: productsModule
  },
});
