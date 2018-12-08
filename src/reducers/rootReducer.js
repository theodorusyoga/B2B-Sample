import { combineReducers } from 'redux';
import login from './login';
import store from './store';

export default combineReducers({
  login,
  store
});
