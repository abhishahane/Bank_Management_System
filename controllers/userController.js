/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const util = require('../util');

module.exports.signup = async (req, res) => {
  const {
    name,
    userName,
    password,
    address,
    state,
    country,
    emailAddress,
    pan,
    contactNo,
    dob,
    accountType,
  } = req.body;

  try {
    const user = await User.create({
      name,
      userName,
      password,
      address,
      state,
      country,
      emailAddress,
      pan,
      contactNo,
      dob,
      accountType,
    });
    // const token = util.createToken(user._id);
    // eslint-disable-next-line max-len
    // res.cookie('jwt', token, {                       //code for automatically log in after sign up
    //     httpOnly: true,
    //     maxAge: maxAge * 1000
    // });
    res.status(201).json({
      user,
      message: 'User added successfully',
    });
  } catch (err) {
    const errors = util.handleUserErrors(err);
    res.status(403).json({
      errors,
    });
  }
};

module.exports.login = async (req, res) => {
  const {
    userName,
    password,
  } = req.body;

  try {
    const user = await User.login(userName, password);
    const token = util.createToken(user._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: util.maxAge * 1000,
    });
    res.status(200).json({
      user: user._id,
      message: 'logged in successfully',
      token,
    });
  } catch (err) {
    const errors = util.handleUserErrors(err);
    res.status(401).json({
      errors,
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    maxAge: 1,
  });
  res.status(200).json({
    message: 'Logout Successful',
  });
};

// Update an user
module.exports.updateUser = async (req, res) => {
  // try{
  const decodedToken = await jwtDecode(req.cookies.jwt);
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(403).json({
        error: 'password is required',
      });
    }
    User.findOneAndUpdate({
      _id: decodedToken.id,
    }, {
      $set: {
        name: req.body.name,
        userName: req.body.userName,
        password: hash,
        address: req.body.address,
        state: req.body.state,
        country: req.body.country,
        emailAddress: req.body.emailAddress,
        pan: req.body.pan,
        contactNo: req.body.contactNo,
        dob: req.body.dob,
        accountType: req.body.accountType,
      },
    })
      .then(() => {
        res.status(200).json({
          message: 'Updated Successfully',
        });
      });
    // .catch(err => {
    //     console.log(err);
    //     res.status(400).json({
    //         error: err
    //     })
    // })
  });
  // } catch (err) {
  //     const errors = util.handleUserErrors(err);
  //     res.status(400).json({
  //         errors
  //     });
  // }
};

// Retrive user
module.exports.getUser = async (req, res) => {
  const decodedToken = jwtDecode(req.cookies.jwt);
  await User.find({
    _id: decodedToken.id,
  })
    .then((result) => {
      res.status(200).json({
        userData: result,
      });
    });
  // .catch(err => {
  //     console.log(err);
  //     res.status(401).json({
  //         error: err
  //     })
  // })
};

// Deleting a user
module.exports.deleteUser = async (req, res) => {
  const decodedToken = jwtDecode(req.cookies.jwt);
  await User.deleteOne({
    _id: decodedToken.id,
  })
    .then(() => {
      res.cookie('jwt', '', {
        maxAge: 1,
      });
      res.status(200).json({
        message: 'User deleted',
      });
    });
  // .catch(err => {
  //     res.status(401).json({
  //         error: err
  //     })
  // })
};
