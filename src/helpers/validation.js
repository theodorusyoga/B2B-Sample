export const formValidation = (values) => {
  const errors = {};
  const ignoredKeys = ['tax_card_number', 'file_tax_card', 'products_multi', 'sort',
    'minimal_lending', 'maximum_lending'];
  Object.keys(values).forEach((key) => {
    if (key.indexOf('multi') >= 0 && values[key].length === 0 && ignoredKeys.indexOf(key) === -1) {
      errors[key] = 'Required';
    }
  });
  return errors;
};

export default formValidation;
