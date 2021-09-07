'use strict';
require("dotenv").config();
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const base64 = require('base-64');


let obj = {
    title: 'car fixing',
    image: 'tbfdsdsad3rg3egs54',
    description: "car fix on computer",
    phoneNumber: "07909090"

}


describe('Auth Tests', () => {
    let obj = {
        username: 'yzn3345',
        password: 'yzn1222'
    }

    it('sign up test  ', async () => {

        const response = await request.post('/signup').send(obj); // async
        expect(response.status).toEqual(201);


    });

    it('sign in test  ', async () => {


        const response = await request.post('/signin')
            .auth('yzn33', 'yzn1222')
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

    it(' ADMIN TEST ROUTE FOR GETTING USERS  ', async () => {

        const response = await request.post('/signin').auth('yzn33', 'yzn1222');


        const token = response.body.token;

        const bearerResponse = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
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

describe('FAILED ROUTE: product (authenticated API) routes', () => {


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

});
/*************************************************************** */
describe('WORKING ROUTE: product (authenticated API) routes', () => {

    it(' show all product  ', async () => {
        const response = await request.get('/product/mechanic').send(obj);
        expect(response.status).toEqual(200);
    });

    it(' get product  ', async () => {

        const response = await request.post('/signin').auth('yzn33', 'yzn1222');


        const token = response.body.token;

        const bearerResponse = await request
            .get('/product/mechanic')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });

    it(' post product  ', async () => {

        const response = await request.post('/signin').auth('yzn33', 'yzn1222');


        const token = response.body.token;

        const bearerResponse = await request
            .post('/product/mechanic')
            .send(obj)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });


    it(' update product  ', async () => {

        const response = await request.post('/signin').auth('yzn33', 'yzn1222');


        const token = response.body.token;

        const bearerResponse = await request
            .put('/product/mechanic/1')
            .send(obj)
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });


    it(' delete product  ', async () => {

        const response = await request.post('/signin').auth('yzn33', 'yzn1222');


        const token = response.body.token;

        const bearerResponse = await request
            .delete('/product/mechanic/1')
            .set('Authorization', `Bearer ${token}`)

        expect(response.status).toEqual(200);
    });

});

