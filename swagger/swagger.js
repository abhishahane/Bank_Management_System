const { Router } = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const router = Router();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bank Management System',
      version: '1.0.0',
      description: 'API for bank management',
      contact: {
        name: 'Abhishek Shahane',
        email: 'abhishek10404shahane@gmail.com',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['../BankManagementSystem/swagger/swagger.js'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
router.use('/api-document-1', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

/**
 * @swagger
 * definitions:
 *  User:
 *   type: object
 *   properties:
 *    name:
 *     type: string
 *     description: name of the user
 *     example: 'Abhishek Shahane'
 *    userName:
 *     type: string
 *     description: userName of the user
 *     example: 'Abhi17'
 *    password:
 *     type: string
 *     description: password of the user
 *     example: '7y8y8ry309@#'
 *    address:
 *     type: string
 *     description: address of the user
 *     example: 'Amravati'
 *    state:
 *     type: string
 *     description: state of the user
 *     example: 'Maharashtra'
 *    country:
 *     type: string
 *     description: country of the user
 *     example: 'India'
 *    emailAddress:
 *     type: string
 *     description: email address of the user
 *     example: 'abhi17@gmail.com'
 *    pan:
 *     type: string
 *     description: pan number of the user
 *     example: '45rty78ugRTY'
 *    contactNo:
 *     type: number
 *     description: contact number of the user
 *     example: '9876756787'
 *    dob:
 *     type: date
 *     description: date of birth of the user
 *     example: '12/17/1998'
 *    accountType:
 *     type: string
 *     description: account type of the user
 *     example: 'Salary'
 *  Loan:
 *   type: object
 *   properties:
 *    loanType:
 *     type: string
 *     description: type of loan
 *     example: 'Home Loan'
 *    loanAmount:
 *     type: number
 *     description: amount of loan
 *     example: 200000
 *    date:
 *     type: date
 *     description: date of loan
 *     example: '08/16/2021'
 *    rateOfInterest:
 *     type: number
 *     description: rate of interest
 *     example: 5
 *    durationOfLoan:
 *     type: number
 *     description: duration of loan
 *     example: 6
 */

// user routes

/**
 * @swagger
 * /signup:
 *  post:
 *   summary: create user
 *   description: create user for the bank
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    201:
 *     description: user created successfully
 *    401:
 *     description: user creation failed
 */

/**
 * @swagger
 * /login:
 *  post:
 *   summary: login user
 *   description: login user for the Bank Management System
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *          type: object
 *          properties:
 *              userName:
 *                  type: string
 *                  example: 'Abhi17'
 *              password:
 *                  type: string
 *                  example: '7y8y8ry309@#'
 *          required:
 *              - userName
 *              - password
 *   responses:
 *    201:
 *     description: login succesfully
 *    401:
 *     description: login failed
 */

/**
 * @swagger
 * /logout:
 *  get:
 *   summary: logout user
 *   description: Logout The user
 *   responses:
 *    201:
 *     description: success
 *    401:
 *     description: error
 */

/**
 * @swagger
 * /user:
 *  put:
 *   summary: update user
 *   description: update the current
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/User'
 *   responses:
 *    201:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    401:
 *     description: error
 */

/**
 * @swagger
 * /user:
 *  get:
 *   summary: get the user details
 *   description: details of the user
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/User'
 *    400:
 *     description: error
 */

/**
 * @swagger
 * /user:
 *  delete:
 *   summary: delete user
 *   description: delete user
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: error
 */

/**
 * @swagger
 * /loan:
 *  post:
 *   summary: apply loan
 *   description: user can apply for loan
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Loan'
 *   responses:
 *    201:
 *     description: loan applied successfully
 *    401:
 *     description: failed
 */

/**
 * @swagger
 * /loan:
 *  get:
 *   summary: get the loan details
 *   description: details of the loan
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Loan'
 *    400:
 *     description: error
 */

/**
 * @swagger
 * /loan/{_id}:
 *  put:
 *   summary: update loan details
 *   description: update the loan
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: _id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the loan
 *      example: '611a2addd8ef1c5a148b3348'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Loan'
 *   responses:
 *    201:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Loan'
 *    401:
 *     description: error
 */

/**
 * @swagger
 * /loan/{_id}:
 *  delete:
 *   summary: delete loan
 *   description: delete loan
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: _id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the loan
 *      example: '611a2addd8ef1c5a148b3348'
 *   responses:
 *    200:
 *     description: success
 *    400:
 *     description: error
 */

module.exports = router;
