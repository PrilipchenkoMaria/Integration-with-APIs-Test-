import {
  STRIPE_SIGN_IN_SUCCESS, STRIPE_SIGN_IN_FAIL, STRIPE_SIGN_IN_VALIDATION,
} from "../actionTypes";

const initialState = {
  stripeConnected: false,
  stripeIsFetching: false,
  stripeErrorMessage: null,
};

interface Action {
  type: string;
  payload: any;
}

const auth = (state = initialState, action: Action) => {
  switch (action.type) {
    case STRIPE_SIGN_IN_VALIDATION: {
      return {
        ...state,
        stripeConnected: false,
        stripeIsFetching: true,
        stripeErrorMessage: null,
      };
    }
    case STRIPE_SIGN_IN_SUCCESS: {
      return {
        ...state,
        stripeConnected: true,
        stripeIsFetching: false,
        stripeErrorMessage: false,
      };
    }
    case STRIPE_SIGN_IN_FAIL: {
      return {
        ...state,
        stripeConnected: false,
        stripeIsFetching: false,
        stripeErrorMessage: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
};

export interface AuthStore {
  stripeConnected: boolean;
  stripeIsFetching: boolean;
  stripeErrorMessage?: string;
}

export default auth;
