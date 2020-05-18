import {
  CREATE_PAYMENT_INTENT,
  CREATE_PAYMENT_INTENT_FAIL,
  CREATE_PAYMENT_INTENT_SUCCESS,
} from "../actionTypes";

const initialState = {
  clientSecret: null,
  errorMessage: false,
  intentIsFetching: false,
};

interface Action {
  type: string;
  payload: any;
}

const paymentIntent = (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_PAYMENT_INTENT: {
      return {
        ...state,
        intentIsFetching: true,
      };
    }
    case CREATE_PAYMENT_INTENT_FAIL: {
      return {
        ...state,
        intentIsFetching: false,
        error: true,
      };
    }
    case CREATE_PAYMENT_INTENT_SUCCESS: {
      return {
        ...state,
        intentIsFetching: false,
        clientSecret: action.payload.clientSecret,
      };
    }
    default: {
      return state;
    }
  }
};

export interface PaymentIntentStore {
  clientSecret?: string,
  error: boolean,
  intentIsFetching: boolean,
}

export default paymentIntent;
