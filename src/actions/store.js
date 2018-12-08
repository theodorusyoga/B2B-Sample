export const SET_STORE_LIST = 'store/SET_STORE_LIST';

export const checkLogin = () => async (dispatch, getState) => {
  await dispatch({ type: 'CHECK_AUTH' });
};

export const getStore = () => async (dispatch) => {

};
