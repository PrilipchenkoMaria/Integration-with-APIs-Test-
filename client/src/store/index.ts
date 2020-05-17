import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { AuthStore } from "./reducers/auth";
import { ProductsStore } from "./reducers/products";

const sagaMiddleware = createSagaMiddleware();

export interface AppStore {
  auth: AuthStore;
  products: ProductsStore
}

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);
