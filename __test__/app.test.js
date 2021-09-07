'use strict';
require("dotenv").config();
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const base64 = require('base-64');



describe('Auth Tests', () => {
    let obj = {
        username: 'sultan6111',
        password: 'test@12341'
    }

    it('sign up test  ', async () => {

        const response = await request.post('/signup').send(obj); // async
        expect(response.status).toEqual(201);


    });

    it('sign in test  ', async () => {


        const response = await request.post('/signin')
            .auth('sultan6111', 'test@12341')
        const userObject = response.body;
        expect(response.status).toBe(200);
        expect(userObject.user).toBeDefined();
        expect(userObject.token).toBeDefined()


    });

    it('basic fails with unknown user', async () => {
        const response = await request.post('/signin')
            .auth('', 'test@12341')
        const userObject = response.body;
        expect(response.status).toBe(403);
        expect(userObject.user).not.toBeDefined();
        expect(userObject.token).not.toBeDefined()
    });



})
describe('my API Server', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
    })

    // add scenarios & test cases 
    it('handles not found request', async () => {
       
        const response = await request.get('/asd'); // async
        expect(response.status).toEqual(404);
    });



    it('handles my internal server errors', async () => {
        const response = await request.get('/product/bad'); // async
        expect(response.status).toEqual(500);
    });


    it('/ route works', async () => {
        const response = await request.get('/home'); // async
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('im live =====================');
    });


});
// =====================================================================

describe('product (authenticated API) routes', ()=> {
    let obj = {
        title: 'car fixing',
        image: 'tbfdsdsad3rg3egs54',
        description: "car fix on computer",
        phoneNumber: "07909090"

    }
    
    it(' show all product  ', async () => {
        const response = await request.get('/product/mechanic').send(obj);
        expect(response.status).toEqual(200);
    });

    it('failed add product  ', async () => {
        const response = await request.post('/product/mechanic').send(obj);
        expect(response.status).toEqual(500);
    });

    it('failed show product  ', async () => {
        const response = await request.get('/product/mechanic/1').send(obj);
        expect(response.status).toEqual(500);
    });


    it('failed update product  ', async () => {
        const response = await request.put('/product/mechanic/1').send(obj);
        expect(response.status).toEqual(500);
    });

    it('failed delete product  ', async () => {
        const response = await request.delete('/product/mechanic/1 ').send(obj);
        expect(response.status).toEqual(500);
    });



})

// ==========================
// describe('My API tests 3', function() {

//     var token = null;
  
//     before(function(done) {
//       request(url)
//         .post('/user/token')
//         .send({ _id: user1._id, password: user1.password })
//         .end(function(err, res) {
//           token = res.body.token; // Or something
//           done();
//         });
//     });
  
//     it('should get a valid token for user: user1', function(done) { 
//       request('/get/user')
//         .set('Authorization', 'Bearer ' + token)
//         .expect(200, done);
//     });
//   });
// ==========================

// const jwt = require('jsonwebtoken')
// process.env.SECRET = "SECRET KEY";
// const middleware = require('../src/auth/middleware/bearer.middle');
// const { db, users } = require('../src/auth/models/index');


// let userInfo = {
//     admin: { username: 'admin', password: 'password' },
//   };
  
//   // Pre-load our database with fake UserModel
//   beforeAll(async (done) => {
//     await db.sync();
//     await users.create(userInfo.admin);
//     done();
//   });
//   afterAll(async (done) => {
//     await db.drop();
//     done();
//   });
  
//   describe('Auth Middleware', () => {
  
//     // Mock the express req/res/next that we need for each middleware call
//     const req = {};
//     const res = {
//       status: jest.fn(() => res),
//       send: jest.fn(() => res)
//     }
//     const next = jest.fn();
  
//     describe('user authentication', () => {
  
//       it('fails a login for a user (admin) with an incorrect token', () => {
  
//         req.headers = {
//           authorization: 'Bearer thisisabadtoken',
//         };
  
//         return middleware(req, res, next)
//           .then(() => {
//             expect(next).not.toHaveBeenCalled();
//             expect(res.status).toHaveBeenCalledWith(403);
//           });
  
//       });
  
//       it('logs in a user with a proper token', () => {
  
//         const user = { username: 'admin' };
//         const token = jwt.sign(user, process.env.SECRET);
  
//         req.headers = {
//           authorization: `Bearer ${token}`,
//         };
  
//         return middleware(req, res, next)
//           .then(() => {
//             expect(next).toHaveBeenCalledWith();
//           });
  
//       });
  
//     });
  
//   });