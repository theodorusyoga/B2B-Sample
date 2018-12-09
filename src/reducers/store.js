import {
  SET_STORE_LIST, SET_WARNING, TOGGLE_LOADING,
  SET_STORE_DETAILS, TOGGLE_STORE_LOADING
} from '../actions/store';

const initialState = {
  stores: [],
  count: 0,
  next: '',
  previous: '',
  warning: [],
  isLoading: false,
  isStoreLoading: false,
  storeDetails: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_LIST:
      return {
        ...state,
        stores: action.stores,
        count: action.count,
        next: action.next,
        previous: action.previous
      };
    case SET_WARNING:
      return {
        ...state,
        warning: action.warning
      };
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case TOGGLE_STORE_LOADING:
      return {
        ...state,
        isStoreLoading: action.isStoreLoading
      };
    case SET_STORE_DETAILS:
      return {
        ...state,
        storeDetails: action.storeDetails
      };
    default:
      return state;
  }
};
