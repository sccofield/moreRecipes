import validator from 'validator';

const formValidator = (data) => {
  const errors = [];

  if (validator.isEmpty(data.userName)) {
    errors.push('Name is required');
  }

  if (validator.isEmpty(data.email)) {
    errors.push('Email is required');
  }

  if (!validator.isEmail(data.email)) {
    errors.push('A valid email is required');
  }

  if (validator.isEmpty(data.password)) {
    errors.push('Password is required ');
  }

  if (!validator.isLength(data.password, {
    min: 6, max: 100
  })) {
    errors.push('Password should be at least 6 characters');
  }

  if (validator.isEmpty(data.cPassword)) {
    errors.push('Email is required');
  }

  if (!validator.equals(data.password, data.cPassword)) {
    errors.push('Passwords don\'t match');
  }

  return {
    errors,
  };
};

export default formValidator;
