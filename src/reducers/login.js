import { SET_AUTHENTICATION, SET_WARNING } from '../actions/login';

const initialState = {
  userId: 0,
  username: '',
  email: '',
  isAuthenticated: false,
  warning: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        userId: action.userId,
        username: action.username,
        email: action.email,
        isAuthenticated: action.isAuthenticated
      };
    case SET_WARNING:
      return {
        ...state,
        warning: action.warning
      };
    default:
      return state;
  }
};
