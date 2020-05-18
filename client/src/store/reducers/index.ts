import { combineReducers } from "redux";
import auth from "./auth";
import products from "./products";
import productCreation from "./productCreation";

export default combineReducers({
  auth,
  products,
  productCreation,
});
