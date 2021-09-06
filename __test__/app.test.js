'use strict';
require("dotenv").config();
const supertest = require('supertest');
const { server } = require('../src/server');
const request = supertest(server);
const base64 = require('base-64');



describe('DATA BASE TEST', ()=> {
    let obj={
        username:'sultan',
        password:'test@1234'
    }

    it('creat account  ', async () => {
       
        const response = await request.post('/signup').send(obj); // async
        expect(response.status).toEqual(201);
      
    
    });

    it('sign in   ', async () => {
     
       
        const response = await request.post('/signin').set('Authorization', `Basic YWhtYWRuOnRlc3QxMjM=`); // async
        expect(response.status).toEqual(200);
    expect(response.body.username).toBe('sultan');
      
    
    });


    
})
describe('my API Server', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation();
    })

    // add scenarios & test cases 
    it('handles not found request', async () => {
        // add test
        const response = await request.get('/asd'); // async
        expect(response.status).toEqual(404);
    });



    it('handles my internal server errors', async () => {
        const response = await request.get('/product/bad'); // async
        expect(response.status).toEqual(500);
    });


    it('/ route works', async () => {
        const response = await request.get('/'); // async
        expect(response.status).toEqual(200);
        console.log(response.text);
        expect(response.text).toEqual('im live =====================');
    });


});
// =====================================================================

// describe('V1 (Unauthenticated API) routes', ()=> {
//     let obj = {
//         title: 'car fixing',
//         image: 'tbfdsdsad3rg3egs54',
//         description: "car fix on computer",
//         phoneNumber: "07909090"

//     }
//     it('creat model  ', async () => {
//         const response = await request.GET('product/:model').send(obj);
//         expect(response.status).toEqual(201);
//     });

//     it('show model  ', async () => {
//         const response = await request.GET('product/:model/:id').send(obj);
//         expect(response.status).toEqual(201);
//     });

//     it('add model  ', async () => {
//         const response = await request.POST('product/:model/:id ').send(obj);
//         expect(response.status).toEqual(201);
//     });

//     it('update model  ', async () => {
//         const response = await request.PUT('product/:model/:id ').send(obj);
//         expect(response.status).toEqual(201);
//     });

//     it('delete model  ', async () => {
//         const response = await request.DELETE('product/:model/:id ').send(obj);
//         expect(response.status).toEqual(204);
//     });



// })

