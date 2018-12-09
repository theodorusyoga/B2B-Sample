import { push } from 'react-router-redux';
import { getStores, getStoreDetails } from '../helpers/api';

export const SET_STORE_LIST = 'store/SET_STORE_LIST';
export const SET_WARNING = 'store/SET_WARNING';
export const TOGGLE_LOADING = 'store/TOGGLE_LOADING';
export const TOGGLE_STORE_LOADING = 'store/TOGGLE_STORE_LOADING';
export const SET_STORE_DETAILS = 'store/SET_STORE_DETAILS';
export const SET_FILTER_TYPE = 'store/SET_FILTER_TYPE';

export const toggleLoading = isLoading => ({ type: TOGGLE_LOADING, isLoading });

export const toggleStoreLoading = isStoreLoading => ({ type: TOGGLE_STORE_LOADING, isStoreLoading });

export const checkLogin = () => async (dispatch, getState) => {
  await dispatch({ type: 'CHECK_AUTH' });
};

export const getStore = action => async (dispatch, getState) => {
  dispatch(toggleLoading(true));

  let params;

  if (action === 'next') {
    const page = getState().store.next;
    params = { page: page !== 0 ? page : undefined };
  } else if (action === 'previous') {
    const page = getState().store.previous;
    params = { page: page !== 0 ? page : undefined };
  }

  const filter = getState().store.filterType;
  if (filter !== '') {
    params = {
      ...params,
      type: filter
    };
  }

  getStores(params).then(async ({ data }) => {
    // find current next and prev page
    let nextPage;
    let prevPage;
    if (data.next !== null) {
      const split = String(data.next).split('?');
      if (split.length > 0) {
        const nextParams = new URLSearchParams(split[1]);
        nextPage = Number(nextParams.get('page'));
      }
    }
    if (data.previous !== null) {
      const split = String(data.previous).split('?');
      if (split.length > 0) {
        const prevParams = new URLSearchParams(split[1]);
        prevPage = Number(prevParams.get('page'));
      }
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

export const setFilterType = e => async (dispatch) => {
  await dispatch({ type: SET_FILTER_TYPE, filterType: e.target.value });
  dispatch(getStore());
};

export const getStoreDetail = id => async (dispatch) => {
  dispatch(toggleStoreLoading(true));
  getStoreDetails(id).then(async ({ data }) => {
    dispatch({ type: SET_STORE_DETAILS, storeDetails: data });
    dispatch(toggleStoreLoading(false));
  }).catch(() => {
    dispatch(push('/'));
    dispatch(toggleStoreLoading(false));
  });
};
