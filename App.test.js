const request = require('supertest');
const app = require('./App');

// funcionamiento general:

describe('Endpoint', () => {
    it('retornar código de status 200',
    async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    })
})

// Lectura de archivos:

describe('Endpoint', () => {
    it('retornar código de status 200',
    async () => {
        const response = await request(app).get('/teknos/api/folders');
        expect(response.statusCode).toBe(200);
    })
})