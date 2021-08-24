/* eslint-disable no-underscore-dangle */
const jwtDecode = require('jwt-decode');
const Loan = require('../models/loan');
const util = require('../util');

module.exports.applyLoan_post = async (req, res) => {
  const decodedToken = jwtDecode(req.cookies.jwt);
  const {
    userId = decodedToken.id,
    loanType,
    loanAmount,
    date,
    rateOfInterest,
    durationOfLoan,
  } = req.body;

  try {
    const loan = await Loan.create({
      userId,
      loanType,
      loanAmount,
      date,
      rateOfInterest,
      durationOfLoan,
    });
    res.status(201).json({
      loan,
      msg: 'Loan applied successfully',
      loanId: loan._id,

    });
  } catch (err) {
    const errors = util.handleLoanErrors(err);
    res.status(403).json({
      errors,
    });
  }
};

// Retrive loans
module.exports.getLoans = async (req, res) => {
  const decodedToken = jwtDecode(req.cookies.jwt);
  await Loan.find({
    userId: decodedToken.id,
  })
    .then((result) => {
      res.status(200).json({
        loanData: result,
      });
    });
  // .catch(err => {
  //     console.log(err);
  //     res.status(400).json({
  //         error: err
  //     })
  // })
};

// Deleting a loan by Id
module.exports.deleteLoan = async (req, res) => {
  await Loan.findOneAndDelete({
    _id: req.params.id,
  })
    .then((result) => {
      if (result == null) {
        res.status(400).json({
          error: `Loan with id:${req.params.id} does not exist`,
        });
      } else {
        res.status(200).json({
          message: 'Loan deleted',
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err,
      });
    });
};

// Update an loan by Id
module.exports.updateLoan = async (req, res) => {
  await Loan.findOneAndUpdate({
    _id: req.params.id,
  }, {
    $set: {
      loanType: req.body.loanType,
      loanAmount: req.body.loanAmount,
      date: req.body.date,
      rateOfInterest: req.body.rateOfInterest,
      durationOfLoan: req.body.durationOfLoan,
    },
  })
    .then(() => {
      res.status(201).json({
        message: 'Updated Successfully',
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: err,
      });
    });
};
