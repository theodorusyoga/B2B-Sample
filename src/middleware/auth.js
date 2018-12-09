import { get, set, remove } from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATION, SET_WARNING } from '../actions/login';

const authMiddleware = store => next => async (action) => {
  if (action.type === 'AUTHENTICATE') {
    store.dispatch({ type: SET_WARNING, warning: [] });
    try {
      const authObject = jwtDecode(action.token);
      await store.dispatch({
        type: SET_AUTHENTICATION,
        userId: authObject.user_id,
        username: authObject.username,
        email: authObject.email,
        isAuthenticated: true
      });
      set('token', action.token);
    } catch (e) {
      if (e) {
        remove('token');
      }
    }
  } else if (action.type === 'CHECK_AUTH') {
    store.dispatch({ type: SET_WARNING, warning: [] });
    const token = get('token');
    try {
      const authObject = jwtDecode(token);
      await store.dispatch({
        type: SET_AUTHENTICATION,
        userId: authObject.user_id,
        username: authObject.username,
        email: authObject.email,
        isAuthenticated: true
      });
    } catch (e) {
      if (e) {
        remove('token');
      }
    }
  } else if (action.type === 'REMOVE_AUTH') {
    remove('token');
    await store.dispatch({
      type: SET_AUTHENTICATION,
      userId: 0,
      username: '',
      email: '',
      isAuthenticated: false
    });
  } else {
    next(action);
  }
};

export default authMiddleware;
