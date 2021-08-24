const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  loanType: {
    type: String,
    required: [true, 'Please specify loan type'],
  },
  loanAmount: {
    type: Number,
    required: [true, 'Please enter loan amount'],
  },
  date: {
    type: Date,
    required: [true, 'Please enter date'],
  },
  rateOfInterest: {
    type: Number,
    required: [true, 'Please provide rate of interest'],
  },
  durationOfLoan: {
    type: Number,
    required: [true, 'Please enter duration of loan'],
  },
});

module.exports = mongoose.model('loan', loanSchema);
