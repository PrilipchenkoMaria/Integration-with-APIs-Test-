import {
  SIGN_OUT,
  SIGN_UP,
  STRIPE_SIGN_IN_VALIDATION,
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

export const signOutUser = () => {
  history.push("/");
  return {
    type: SIGN_OUT,
  };
};
