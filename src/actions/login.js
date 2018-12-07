export const simpleAction = () => (dispatch) => {
  dispatch({
    type: 'SIMPLE_ACTION',
    payload: process.env.API_URL
  });
};

export default simpleAction;
