/* eslint-disable func-names */
const mongoose = require('mongoose');
const {
  isEmail,
} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
  },
  userName: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please enter address'],
  },
  state: {
    type: String,
    required: [true, 'Please enter state'],
  },
  country: {
    type: String,
    required: [true, 'Please enter country'],
  },
  emailAddress: {
    type: String,
    required: [true, 'Please enter email address'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  pan: {
    type: String,
    required: [true, 'Please enter pan'],
    unique: true,
  },
  contactNo: {
    type: Number,
    required: [true, 'Please enter contact number'],
    minlength: [10, 'Minimum 10 digits are required'],
    maxlength: [10, 'Maximum 10 digits are required'],
  },
  dob: {
    type: Date,
    required: [true, 'Please enter date of birth'],
  },
  accountType: {
    type: String,
    required: [true, 'Please enter account type'],
  },
});

// fire a function after a doc is saved to the database
// userSchema.post('save', function (doc, next) {
//     console.log('new user has been registered', doc);
//     next();
// })

// fire a function before a doc is saved to the database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (userName, password) {
  const user = await this.findOne({
    userName,
  });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('password is incorrect');
  } else {
    throw Error('username is incorrect');
  }
};

const User = mongoose.model('user', userSchema);
module.exports = User;
