import validator from 'validator';

const formValidator = (data) => {
  const errors = [];

  if (validator.isEmpty(data.title)) {
    errors.push('Recipe title is required');
  }


  if (validator.isEmpty(data.ingredients)) {
    errors.push('Recipe ingredient is required');
  }

  if (validator.isEmpty(data.description)) {
    errors.push('Recipe description is required');
  }


  return {
    errors,
  };
};

export default formValidator;
