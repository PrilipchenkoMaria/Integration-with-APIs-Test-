import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { AuthStore } from "./reducers/auth";
import { ProductsStore } from "./reducers/products";
import { ProductCreationStore } from "./reducers/productCreation";

const sagaMiddleware = createSagaMiddleware();

export interface AppStore {
  auth: AuthStore;
  products: ProductsStore
  productCreation: ProductCreationStore;
}

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);
