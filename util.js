const key = process.env.KEY;
const jwt = require('jsonwebtoken');

// create json web token
const maxAge = 3 * 24 * 60 * 60; // time in seconds
const createToken = (id) => jwt.sign({
  id,
}, key, {
  expiresIn: maxAge,
});

// to handle user errors
const handleUserErrors = (err) => {
  // console.log(err.message, err.code);
  const errors = {
    name: '',
    userName: '',
    password: '',
    address: '',
    state: '',
    country: '',
    emailAddress: '',
    pan: '',
    contactNo: '',
    dob: '',
    accountType: '',
  };

  // incorrect username
  if (err.message === 'username is incorrect') {
    errors.userName = 'user with that username does not exist';
  }

  // incorrect password
  if (err.message === 'password is incorrect') {
    errors.password = 'incorrect password';
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.emailAddress = 'that email is already registered';
    errors.userName = 'that username is already used';
    errors.pan = 'pan no is already used';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({
      properties,
    }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// to handle loan errors
const handleLoanErrors = (err) => {
  const errors = {
    loanType: '',
    loanAmount: '',
    date: '',
    rateOfInterest: '',
    durationOfLoan: '',
  };
  // validation errors
  if (err.message.includes('loan validation failed')) {
    Object.values(err.errors).forEach(({
      properties,
    }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = {
  handleUserErrors, handleLoanErrors, maxAge, createToken,
};
