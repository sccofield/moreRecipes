import validator from 'validator';

const formValidator = (data) => {
  const errors = [];

  if (validator.isEmpty(data.email)) {
    errors.push('Email is required');
  }

  if (!validator.isEmail(data.email)) {
    errors.push('A valid email is required');
  }

  if (validator.isEmpty(data.password)) {
    errors.push('Password is required ');
  }

  return {
    errors,
  };
};

export default formValidator;
