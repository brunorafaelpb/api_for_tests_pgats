const request = require('supertest');
const { expect } = require('chai');

describe('Tranfer API', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            const response = await request('http://localhost:3000')
                .post('/transfer')
                .send({ 
                    from: "Bruno",
                    to: "Fernanda",
                    amount: 10
                });
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
});