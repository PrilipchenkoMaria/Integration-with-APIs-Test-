import {
  STRIPE_SIGN_IN_VALIDATION,
} from "./actionTypes";

export const stripeSignInValidation = (query: string) => ({
  type: STRIPE_SIGN_IN_VALIDATION,
  payload: query,
});
