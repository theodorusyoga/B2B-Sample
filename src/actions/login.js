import { push } from 'react-router-redux';
import { login, signup } from '../helpers/api';

export const SET_AUTHENTICATION = 'login/SET_AUTHENTICATION';
export const SET_WARNING = 'login/SET_WARNING';
export const SET_SUCCESS = 'login/SET_SUCCESS';

export const resetMessages = () => (dispatch) => {
  dispatch({ type: SET_WARNING, warning: [] });
};

export const goTo = link => (dispatch) => { dispatch(push(link)); };

export const logout = () => async (dispatch) => {
  await dispatch({ type: 'REMOVE_AUTH' });
};

export const checkLogin = () => async (dispatch, getState) => {
  await dispatch({ type: 'CHECK_AUTH' });
  if (getState().login.isAuthenticated) {
    dispatch(push('/'));
  }
};

export const onLoginFormSubmit = (values, { setSubmitting }) => async (dispatch) => {
  await dispatch({ type: SET_SUCCESS, success: '' });
  login(values).then(async ({ data }) => {
    await dispatch({ type: 'AUTHENTICATE', token: data.token });
    setSubmitting(false);
    dispatch(push('/'));
  }).catch(({ response }) => {
    if (response) {
      const warning = [];
      Object.keys(response.data).forEach((key) => {
        warning.push(response.data[key]);
      });
      dispatch({ type: SET_WARNING, warning });
    } else {
      dispatch({ type: SET_WARNING, warning: ['Check your connection and try again'] });
    }
    setSubmitting(false);
  });
};

export const onSignUpFormSubmit = (values, { setSubmitting }) => async (dispatch) => {
  signup(values).then(async ({ data }) => {
    setSubmitting(false);
    await dispatch({ type: SET_SUCCESS, success: 'You have signed up successfully! Please login' });
    dispatch(push('/login'));
  }).catch(({ response }) => {
    if (response) {
      const warning = [];
      Object.keys(response.data).forEach((key) => {
        warning.push(response.data[key]);
      });
      dispatch({ type: SET_WARNING, warning });
    } else {
      dispatch({ type: SET_WARNING, warning: ['Check your connection and try again'] });
    }
    setSubmitting(false);
  });
};

export default onLoginFormSubmit;
