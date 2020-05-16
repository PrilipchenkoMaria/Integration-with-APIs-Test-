import {
  STRIPE_SIGN_IN_SUCCESS,
  STRIPE_SIGN_IN_FAIL,
  STRIPE_SIGN_IN_VALIDATION,
  SIGN_UP,
  SIGN_UP_FAIL,
  SIGN_IN_SUCCESS,
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

function* fetchSignUp(action: Action) {
  const user = action.payload;
  const userStringify = JSON.stringify(user);
  const signUpResponse = yield call(() => fetch(`/api/auth/sign-up`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: userStringify,
  })
    .then((res) => res.json()));
  if (signUpResponse.token) {
    localStorage.setItem("token", signUpResponse.token);
    history.push("/");
    yield put({ type: SIGN_IN_SUCCESS, payload: { token: signUpResponse.token } });
  } else if (signUpResponse.message) {
    yield put({ type: SIGN_UP_FAIL, payload: { message: signUpResponse.message } });
  }
}

export default function* rootSaga() {
  yield takeEvery(STRIPE_SIGN_IN_VALIDATION, fetchStripeUserID);
  yield takeEvery(SIGN_UP, fetchSignUp);
}
