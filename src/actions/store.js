import { push } from 'react-router-redux';
import { getStores, getStoreDetails } from '../helpers/api';

export const SET_STORE_LIST = 'store/SET_STORE_LIST';
export const SET_WARNING = 'store/SET_WARNING';
export const TOGGLE_LOADING = 'store/TOGGLE_LOADING';
export const TOGGLE_STORE_LOADING = 'store/TOGGLE_STORE_LOADING';
export const SET_STORE_DETAILS = 'store/SET_STORE_DETAILS';

export const toggleLoading = isLoading => ({ type: TOGGLE_LOADING, isLoading });

export const toggleStoreLoading = isStoreLoading => ({ type: TOGGLE_STORE_LOADING, isStoreLoading });

export const checkLogin = () => async (dispatch, getState) => {
  await dispatch({ type: 'CHECK_AUTH' });
};

export const getStore = action => async (dispatch, getState) => {
  dispatch(toggleLoading(true));

  let params;

  if (action === 'next') {
    params = { page: getState().store.next };
  } else if (action === 'previous') {
    params = { page: getState().store.previous };
  }

  getStores(params).then(async ({ data }) => {
    // find current next and prev page
    let nextPage;
    let prevPage;
    if (data.next !== null) {
      const nextParams = new URLSearchParams(data.next);
      nextPage = Number(nextParams.get('page'));
    }
    if (data.previous !== null) {
      const prevParams = new URLSearchParams(data.previous);
      prevPage = Number(prevParams.get('page'));
    }

    await dispatch({
      type: SET_STORE_LIST,
      stores: data.results,
      count: data.count,
      next: nextPage,
      previous: prevPage
    });

    dispatch(toggleLoading(false));
  }).catch(({ response }) => {
    if (response) {
      dispatch({ type: SET_WARNING, warning: response.data.non_field_errors });
    } else {
      dispatch({ type: SET_WARNING, warning: ['Check your connection and try again'] });
    }
    dispatch(toggleLoading(false));
  });
};

export const getStoreDetail = id => async (dispatch) => {
  dispatch(toggleStoreLoading(true));
  getStoreDetails(id).then(async ({ data }) => {
    dispatch({ type: SET_STORE_DETAILS, storeDetails: data });
    dispatch(toggleStoreLoading(false));
  }).catch(() => {
    dispatch(push('/404'));
    dispatch(toggleStoreLoading(false));
  });
};
