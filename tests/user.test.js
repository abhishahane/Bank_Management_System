/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');

let token;
let fakeToken;

const userData = {
  name: 'test',
  userName: 'test01',
  password: 'test@123',
  address: 'test city',
  state: 'test state',
  country: 'test country',
  emailAddress: 'test01@gmail.com',
  pan: 'testuiu78T6',
  contactNo: 7898098767,
  dob: '1998-09-12',
  accountType: 'Savings',
};

const testUser = {
  userName: userData.userName,
  password: userData.password,
};

const loanData = {
  loanType: 'Home Loan',
  loanAmount: 200000,
  date: '2021-08-18',
  rateOfInterest: 8,
  durationOfLoan: 5,
};

// beforeAll((done) => {
//     mongoose.connect("mongodb://localhost:27017/testDB", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         },
//         () => done());
// });

beforeAll((done) => {
  request(app).post('/signup')
    .send(userData)
    .end(() => {
      done();
    });
});
beforeEach((done) => {
  request(app).post('/login')
    .send(testUser)
    .end((err, res) => {
      token = res.body.token; // saving the token
      done();
    });
});

describe('GET: /user', () => {
  test('get user details - failure', async () => {
    await request(app)
      .get('/user')
      .expect(401);
  });

  test('get user details successful', async () => {
    await request(app)
      .get('/user')
      .set('Cookie', `jwt=${token}`)
      .expect(200);
  });

  test('get user details - using fake token', async () => {
    await request(app)
      .get('/user')
      .set('Cookie', `jwt=${fakeToken}`)
      .expect(401);
  });
});

describe('POST: /signup', () => {
  test('user signup failure', async () => {
    await request(app).post('/signup')
      .expect(403);
  });

  test('user signup - Handling users errors', async () => {
    const data = {
      name: 'test',
      userName: 'Abhi98',
      password: 'test@123',
      address: 'test city',
      state: 'test state',
      country: 'test country',
      emailAddress: 'test01@gmail.com',
      pan: 'testuiu78T6',
      contactNo: 7898098767,
      dob: '1998-09-12',
      accountType: 'Savings',
    };
    await request(app).post('/signup')
      .send(data)
      .expect(403);
  });
});

describe('POST: /login', () => {
  test('user login failure - username and password missing', async () => {
    await request(app).post('/login')
      .expect(401);
  });

  test('user login failure - username missing', async () => {
    await request(app).post('/login')
      .send({
        password: 'test@123',
      })
      .expect(401);
  });

  test('user login failure - username incorrect', async () => {
    await request(app).post('/login')
      .send({
        userName: 'fakeUsername',
        password: 'test@123',
      })
      .expect(401);
  });

  test('user login failure - password missing', async () => {
    await request(app).post('/login')
      .send({
        userName: 'test01',
      })
      .expect(401);
  });

  test('user login failure - password incorrect', async () => {
    await request(app).post('/login')
      .send({
        userName: 'test01',
        password: 'fakePassword',
      })
      .expect(401);
  });

  test('user login failure - username and password incorrect', async () => {
    await request(app).post('/login')
      .send({
        userName: 'fakeUsername',
        password: 'fakePassword',
      })
      .expect(401);
  });

  test('user login successful', async () => {
    await request(app).post('/login')
      .send({
        userName: 'test01',
        password: 'test@123',
      })
      .expect(200);
  });
});

describe('PUT: /user', () => {
  const data = {
    name: 'test_updated',
    userName: 'test01',
    password: 'test@123',
    address: 'test city',
    state: 'test state',
    country: 'test country',
    emailAddress: 'test01@gmail.com',
    pan: 'testuiu78T6',
    contactNo: 7898098767,
    dob: '1998-09-12',
    accountType: 'Savings',
  };

  test('update user details - failure', async () => {
    await request(app)
      .put('/user')
      .send(data)
      .expect(401);
  });

  test('update user details - (failure) without password', async () => {
    await request(app)
      .put('/user')
      .send({
        name: 'test_updated',
        userName: 'test01',
        address: 'test city',
        state: 'test state',
        country: 'test country',
        emailAddress: 'test01@gmail.com',
        pan: 'testuiu78T6',
        contactNo: 7898098767,
        dob: '1998-09-12',
        accountType: 'Savings',
      })
      .set('Cookie', `jwt=${token}`)
      .expect(403);
  });

  test('update user details successful', async () => {
    await request(app)
      .put('/user')
      .send(data)
      .set('Cookie', `jwt=${token}`)
      .expect(200);
  });
});

describe('POST: /loan', () => {
  test('apply loan - failure', async () => {
    await request(app)
      .post('/loan')
      .send(loanData)
      .expect(401);
  });

  test('apply loan - handling errors', async () => {
    await request(app)
      .post('/loan')
      .send({
        loanType: 'Home Loan',
        date: 100968,
        durationOfLoan: 5,
      })
      .set('Cookie', `jwt=${token}`)
      .expect(403);
  });

  test('apply loan successful', async () => {
    await request(app)
      .post('/loan')
      .send(loanData)
      .set('Cookie', `jwt=${token}`)
      .expect(201);
    // console.log(loanData._id);
  });
});

describe('GET: /loan', () => {
  test('get loan details - failure', async () => {
    await request(app)
      .get('/loan')
      .expect(401);
  });

  test('get loan details successful', async () => {
    await request(app)
      .get('/loan')
      .set('Cookie', `jwt=${token}`)
      .expect(200);
  });
});

describe('PUT: /loan', () => {
  const data = {
    loanType: 'Home Loan',
    loanAmount: 200000,
    date: '2021-08-18',
    rateOfInterest: 8,
    durationOfLoan: 5,
  };

  test('update loan - failure (without passing id)', async () => {
    await request(app)
      .put('/loan')
      .send(data)
      .expect(404);
  });

  test('update loan - failure', async () => {
    await request(app)
      .put('/loan/:id')
      .send(data)
      .expect(401);
  });

  // test('update loan successful', async () => {
  //     await request(app)
  //         .put('/loan/:id')
  //         .send(data)
  //         .set('Cookie',`jwt=${token}`)
  //         .expect(201)
  // })
});

describe('DELETE: /loan', () => {
  test('delete loan - failure (without passing id)', async () => {
    await request(app)
      .delete('/loan')
      .expect(404);
  });

  test('delete loan - failure', async () => {
    await request(app)
      .delete('/loan/:id')
      .expect(401);
  });

  // test('delete loan successful', async () => {
  //     await request(app)
  //         .delete('/loan/:id')
  //         .set('Cookie',`jwt=${token}`)
  //         .expect(200)
  // })
});

describe('GET: /logout', () => {
  test('logout - failure', async () => {
    await request(app).get('/logout')
      .expect(401);
  });
  test('logout - successful', async () => {
    await request(app).get('/logout')
      .set('Cookie', `jwt=${token}`)
      .expect(200);
  });
});

describe('DELETE: /user', () => {
  test('delete user - failure', async () => {
    await request(app)
      .delete('/user')
      .expect(401);
  });

  test('delete user successful', async () => {
    await request(app)
      .delete('/user')
      .set('Cookie', `jwt=${token}`)
      .expect(200);
  });
});
