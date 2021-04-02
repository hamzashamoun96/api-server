'use strict';
require('dotenv').config();
const server = require('../src/server.js');
const mongoose = require('mongoose');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);

describe('Server', () => {

    it('Handler Bad Routes', async () => {
        const response = await request.get('/*');
        expect(response.status).toEqual(404);
    });

    it('Handler Bad Methods for food', async () => {
        const response = await request.patch('/food');
        expect(response.status).toEqual(404);
    });
    it('Handler Bad Methods for clothes', async () => {
        const response = await request.patch('/cloth');
        expect(response.status).toEqual(404);
    });
});

describe('Routes', () => {
    let ID1;
    let ID2;
    it('Create record using POST', async () => {
        const response = await request.post(`/food`).send({ food: "apple" })
        expect(response.body.food).toEqual('apple')
        ID1 = response.body._id
    });

    it('Read a list of record using GET', async () => {
        const response = await request.get(`/food`)
        let DATA = response.body.find((obj) => obj._id === ID1);
        expect(DATA._id).toEqual(ID1)
    });

    it('Read a record using GET', async () => {
        const response = await request.get(`/food/${ID1}`)
        expect(response.body._id).toEqual(ID1)
    });

    it('Update a record using PUT', async () => {
        const response = await request.put(`/food/${ID1}`).send({ food: "banana" })
        expect(response.body.food).toEqual('banana')
    });

    it('Destroy a record using DELETE', async () => {
        const response = await request.delete(`/food/${ID1}`)
        expect(response.body).toEqual([])
    });




    it('Create record using POST', async () => {
        const response = await request.post(`/cloth`).send({ cloth: "shirt" })
        expect(response.body.cloth).toEqual('shirt')
        ID2 = response.body._id
    });

    it('Read a list of record using GET', async () => {
        const response = await request.get(`/cloth`)
        let DATA = response.body.find((obj) => obj._id === ID2);
        expect(DATA._id).toEqual(ID2)
    });

    it('Read a record using GET', async () => {
        const response = await request.get(`/cloth/${ID2}`)
        expect(response.body._id).toEqual(ID2)
    });

    it('Update a record using PUT', async () => {
        const response = await request.put(`/cloth/${ID2}`).send({ cloth: "hat" })
        expect(response.body.cloth).toEqual('hat')
    });

    it('Destroy a record using DELETE', async () => {
        const response = await request.delete(`/cloth/${ID2}`)
        expect(response.body).toEqual([])
    });


});