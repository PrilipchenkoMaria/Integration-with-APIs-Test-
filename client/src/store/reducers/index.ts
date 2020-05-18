import { combineReducers } from "redux";
import auth from "./auth";
import products from "./products";
import productCreation from "./productCreation";
import paymentIntent from "./paymentIntent";

export default combineReducers({
  auth,
  products,
  productCreation,
  paymentIntent,
});
