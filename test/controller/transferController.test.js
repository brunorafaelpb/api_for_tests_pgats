const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const app = require('../../app');

const transferService = require('../../service/transferService')

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
            // Mocar apenas a função transfer do Service
            const transferServiceMock = sinon.stub(transferService, 'createTransfer')
            transferServiceMock.returns({
                from: 'bruno',
                to: 'fernanda',
                amount: 1000
            });

            const response = await request(app)
                .post('/transfer')
                .send({ 
                    from: "bruno",
                    to: "fernanda",
                    amount: 1000
                });
            expect(response.status).to.equal(201);
            expect(response.body).to.have.property('from', 'bruno');
            expect(response.body).to.have.property('to', 'fernanda');
            expect(response.body).to.have.property('amount', 1000);

            sinon.restore();
        });
    });

});