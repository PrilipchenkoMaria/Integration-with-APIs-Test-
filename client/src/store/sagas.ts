import {
  STRIPE_SIGN_IN_SUCCESS,
  STRIPE_SIGN_IN_FAIL,
  STRIPE_SIGN_IN_VALIDATION,
  SIGN_UP,
  SIGN_UP_FAIL,
  AUTH_SUCCESS,
  SIGN_IN,
  SIGN_IN_FAIL, TOKEN_VERIFICATION,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";
import history from "../history";


interface Action {
  type: string;
  payload: any;
}

function* fetchStripeUserID(action: Action) {
  const query = action.payload;
  const token = "local storage";

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

export default function* rootSaga() {
  yield takeEvery(STRIPE_SIGN_IN_VALIDATION, fetchStripeUserID);
  yield takeEvery(SIGN_UP, fetchAuth);
  yield takeEvery(SIGN_IN, fetchAuth);
  yield takeEvery(TOKEN_VERIFICATION, tokenVerification);
}
