export const formValidation = (values) => {
  const errors = {};
  const ignoredKeys = [];
  Object.keys(values).forEach((key) => {
    if (values[key] === '' && ignoredKeys.indexOf(key) < 0) {
      errors[key] = 'Required';
    }
  });
  return errors;
};

export default formValidation;
