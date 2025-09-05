const request = require('supertest');
const { expect } = require('chai');

describe('Tranfer API', () => {
    describe('POST /transfer', () => {
        it('Quando informo remetente e destinatário inexistentes recebo 400', async () => {
            // Capturar o token
            const responseLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: "bruno",
                    password: "1234"
                });

            const token = responseLogin.body.token;
            
            // Realiar a transferência
            const response = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
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