import {
  CREATE_PRODUCT,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
} from "../actionTypes";

const initialState = {
  created: false,
  errorMessage: false,
  isFetching: false,
};

interface Action {
  type: string;
  payload: any;
}

const productCreation = (state = initialState, action: Action) => {
  switch (action.type) {
    case CREATE_PRODUCT: {
      return {
        ...state,
        IsFetching: true,
      };
    }
    case CREATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        IsFetching: false,
        created: true,
      };
    }
    case CREATE_PRODUCT_FAIL: {
      return {
        ...state,
        IsFetching: false,
        errorMessage: true,
      };
    }
    default: {
      return state;
    }
  }
};

export interface ProductCreationStore {
  created: boolean,
  error: boolean,
  isFetching: boolean,
}

export default productCreation;
