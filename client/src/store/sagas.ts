import {
  STRIPE_SIGN_IN_SUCCESS, STRIPE_SIGN_IN_FAIL, STRIPE_SIGN_IN_VALIDATION,
} from "./actionTypes";
import { call, put, takeEvery } from "redux-saga/effects";


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

export default function* rootSaga() {
  yield takeEvery(STRIPE_SIGN_IN_VALIDATION, fetchStripeUserID);
}
