import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from "../actionTypes";

const initialState = {
  products: null,
  isFetching: false,
};

interface Action {
  type: string;
  payload: any;
}

const products = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PRODUCTS: {
      return {
        ...state,
        IsFetching: true,
      };
    }
    case GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        IsFetching: false,
        products: action.payload.products,
      };
    }
    case GET_PRODUCTS_FAIL: {
      return {
        ...state,
        IsFetching: false,
      };
    }
    default: {
      return state;
    }
  }
};

export interface ProductsStore {
  products?: { amount: number, name: string, _id: string }[]
  isFetching: boolean,
}

export default products;
