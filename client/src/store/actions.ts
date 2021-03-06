import {
  SIGN_OUT,
  SIGN_UP,
  SIGN_IN,
  STRIPE_SIGN_IN_VALIDATION,
  TOKEN_VERIFICATION,
  GET_PRODUCTS,
  CREATE_PRODUCT, CREATE_PAYMENT_INTENT,
} from "./actionTypes";
import history from "../history";

export const stripeSignInValidation = (query: string) => ({
  type: STRIPE_SIGN_IN_VALIDATION,
  payload: query,
});

export const signUpUser = (user: object) => ({
  type: SIGN_UP,
  payload: user,
});

export const signInUser = (user: object) => ({
  type: SIGN_IN,
  payload: user,
});

export const signOutUser = () => {
  history.push("/");
  return {
    type: SIGN_OUT,
  };
};

export const isAuthenticated = () => ({
  type: TOKEN_VERIFICATION,
});

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const createProduct = (product: object) => ({
  type: CREATE_PRODUCT,
  payload: product,
});

export const createPaymentIntent = (product: object) => ({
  type: CREATE_PAYMENT_INTENT,
  payload: product,
});
