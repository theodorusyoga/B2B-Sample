export const onLoginFormSubmit = (values, { setSubmitting }) => (dispatch) => {
  console.warn(values);
  setTimeout(() => {
    setSubmitting(false);
  }, 2000);
};

export default onLoginFormSubmit;
