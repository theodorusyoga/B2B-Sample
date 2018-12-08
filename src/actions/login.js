import { push } from 'react-router-redux';
import { login } from '../helpers/api';

export const SET_AUTHENTICATION = 'login/SET_AUTHENTICATION';
export const SET_WARNING = 'login/SET_WARNING';

export const checkLogin = () => async (dispatch, getState) => {
  await dispatch({ type: 'CHECK_AUTH' });
  if (getState().login.isAuthenticated) {
    dispatch(push('/'));
  }
};

export const onLoginFormSubmit = (values, { setSubmitting }) => async (dispatch) => {
  login(values).then(async ({ data }) => {
    await dispatch({ type: 'AUTHENTICATE', token: data.token });
    setSubmitting(false);
    dispatch(push('/'));
  }).catch(({ response }) => {
    if (response) {
      dispatch({ type: SET_WARNING, warning: response.data.non_field_errors });
    } else {
      dispatch({ type: SET_WARNING, warning: ['Check your connection and try again'] });
    }
    setSubmitting(false);
  });
};

export default onLoginFormSubmit;
