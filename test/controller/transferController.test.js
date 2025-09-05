const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const transferService = require('../../service/transferService')

describe('Tranfer Controller', () => {
    describe('POST /transfer', () => {
        it.only('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            const responseLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: "bruno",
                    password: "1234"
                });

            const token = responseLogin.body.token;

            const response = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({ 
                    from: "bruno",
                    to: "rafael",
                    amount: 10
                });
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });

        it('USANDO MOCKS: Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'));

            const response = await request(app)
                .post('/transfer')
                .send({ 
                    from: "Bruno",
                    to: "Fernanda",
                    amount: 10
                });
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

            sinon.restore();
        });

        it('USANDO MOCKS: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () => {
            const responseEsperado = require('../fixture/responses/quantoInformoValoresValidosEuTenhoSucessoCom201Created.json')
            
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.returns({
                from: 'bruno',
                to: 'fernanda',
                amount: 1000,
                date: new Date().toISOString()
            });

            const response = await request(app)
                .post('/transfer')
                .send({ 
                    from: "bruno",
                    to: "fernanda",
                    amount: 1000
                });
            expect(response.status).to.equal(201);

            delete response.body.date;
            delete responseEsperado.date;
            expect(response.body).to.deep.equal(responseEsperado)

            sinon.restore();
        });
    });

});