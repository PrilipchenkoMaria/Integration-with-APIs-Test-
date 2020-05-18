import {
  STRIPE_SIGN_IN_SUCCESS,
  STRIPE_SIGN_IN_FAIL,
  STRIPE_SIGN_IN_VALIDATION,
  SIGN_UP,
  SIGN_UP_FAIL,
  AUTH_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAIL,
  TOKEN_VERIFICATION,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  CREATE_PAYMENT_INTENT,
  CREATE_PAYMENT_INTENT_SUCCESS,
  CREATE_PAYMENT_INTENT_FAIL,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import history from "../history";


interface Action {
  type: string;
  payload: any;
}

function* fetchStripeUserID(action: Action) {
  const query = action.payload;
  const { token } = localStorage;
  const verificationResponse = yield call(() => fetch(`/api/connect/oauth/${query}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => res.json()));
  if (verificationResponse.success) {
    yield put({ type: STRIPE_SIGN_IN_SUCCESS });
  }
  if (verificationResponse.error) {
    yield put({ type: STRIPE_SIGN_IN_FAIL, payload: { message: verificationResponse.error } });
  }
}

function* fetchAuth(action: Action) {
  const user = action.payload;
  const userStringify = JSON.stringify(user);
  let uri: string = "", failType: string = "";
  if (action.type === "SIGN_UP") {
    uri = "/api/auth/sign-up";
    failType = SIGN_UP_FAIL;
  }
  if (action.type === "SIGN_IN") {
    uri = "/api/auth/sign-in";
    failType = SIGN_IN_FAIL;
  }
  const authResponse = yield call(() => fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((res) => res.json()));
  if (authResponse.token) {
    localStorage.setItem("token", authResponse.token);
    history.push("/");
    yield put({ type: AUTH_SUCCESS, payload: { token: authResponse.token } });
  } else if (authResponse.message) {
    yield put({ type: failType, payload: { message: authResponse.message } });
  }
}

function* tokenVerification() {
  const { token } = localStorage;
  if (!token) return;
  const tokenVerificationStatus = yield call(() => fetch("/api/auth/token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.status));
  if (tokenVerificationStatus === 200) {
    yield put({ type: AUTH_SUCCESS, payload: { token } });
  } else {
    localStorage.removeItem("token");
    yield put({ type: SIGN_IN_FAIL });
  }
}

function* fetchProducts() {
  const products = yield call(() => fetch("/api/product/all")
    .then((res) => res.json()));
  if (products) {
    yield put({ type: GET_PRODUCTS_SUCCESS, payload: { products } });
  } else yield put({ type: GET_PRODUCTS_FAIL });
}

function* addProduct(action: Action) {
  const { token } = localStorage;
  const product = action.payload;
  const productStringify = JSON.stringify(product);
  const creationStatus = yield call(() => fetch("/api/product/create-product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: productStringify,
  })
    .then((res) => res.status));
  if (creationStatus === 201) {
    yield put({ type: CREATE_PRODUCT_SUCCESS, payload: { token } });
  } else yield put({ type: CREATE_PRODUCT_FAIL });
}

function* addPaymentIntent(action: Action) {
  const product = action.payload;
  let selectedProduct = Object.assign({}, product);
  selectedProduct.amount *= 100;
  const productStringify = JSON.stringify(selectedProduct);
  const creationResponse = yield call(() => fetch("/api/connect/payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: productStringify,
  })
    .then((res) => res.json()));
  if (creationResponse.clientSecret) {
    history.push("/connect/confirm-payment/");
    yield put({ type: CREATE_PAYMENT_INTENT_SUCCESS, payload: { clientSecret: creationResponse.clientSecret } });
  } else yield put({ type: CREATE_PAYMENT_INTENT_FAIL });
}

export default function* rootSaga() {
  yield takeEvery(STRIPE_SIGN_IN_VALIDATION, fetchStripeUserID);
  yield takeEvery(SIGN_UP, fetchAuth);
  yield takeEvery(SIGN_IN, fetchAuth);
  yield takeEvery(TOKEN_VERIFICATION, tokenVerification);
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(CREATE_PRODUCT, addProduct);
  yield takeEvery(CREATE_PAYMENT_INTENT, addPaymentIntent);
}
