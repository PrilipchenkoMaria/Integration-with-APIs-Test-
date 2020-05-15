import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import { AuthStore } from "./reducers/auth";

const sagaMiddleware = createSagaMiddleware();

export interface AppStore {
  auth: AuthStore;
}

export default createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);
