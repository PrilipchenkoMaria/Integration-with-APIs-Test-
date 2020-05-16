import {
  STRIPE_SIGN_IN_SUCCESS,
  STRIPE_SIGN_IN_FAIL,
  STRIPE_SIGN_IN_VALIDATION,
  AUTH_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP,
  SIGN_OUT, SIGN_IN_FAIL, SIGN_IN,
} from "../actionTypes";

const initialState = {
  stripeConnected: false,
  stripeIsFetching: false,
  stripeErrorMessage: null,
  signUpIsFetching: false,
  signUpErrorMessage: null,
  signInIsFetching: false,
  signInErrorMessage: null,
  token: localStorage.getItem("token"),
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
    case SIGN_UP: {
      return {
        ...state,
        signUpIsFetching: true,
      };
    }
    case SIGN_IN: {
      return {
        ...state,
        signInIsFetching: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        signUpIsFetching: false,
      };
    }
    case SIGN_UP_FAIL: {
      return {
        ...state,
        signUpIsFetching: false,
        signUpErrorMessage: action.payload.message,
      };
    }
    case SIGN_IN_FAIL: {
      return {
        ...state,
        signInIsFetching: false,
        signInErrorMessage: action.payload.message,
      };
    }
    case SIGN_OUT: {
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isFetching: false,
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
  signUpIsFetching: boolean,
  signUpErrorMessage?: string,
  signInIsFetching: boolean,
  signInErrorMessage?: string,
  token?: string,
}

export default auth;
