const request = require('supertest');
const sinon = require('sinon');
const assert = require('assert');

const app = require('../../app');

describe('Tranfer Controller', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            const response = await request(app)
                .post('/transfer')
                .send({ 
                    from: "Bruno",
                    to: "Fernanda",
                    amount: 10
                });
            assert.equal(response.status,400);

        });
    });

});