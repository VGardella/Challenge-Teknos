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

    it('retornar código de status 404',
    async () => {
        const response = await request(app).get('/:user/api/folders');
        expect(response.statusCode).toBe(404);
    })

    it('retornar código de status 404',
    async () => {
        const response = await request(app).get('/api/folders');
        expect(response.statusCode).toBe(404);
    })
})

// Creación de mensajes:

describe('Endpoint', () => {
    it('retornar código de status 200',
    async () => {
        const response = await request(app).post('/teknos/api/messages/sent');
        expect(response.statusCode).toBe(200);
    })

    it('retornar código de status 404',
    async () => {
        const response = await request(app).post('/:user/api/messages/sent');
        expect(response.statusCode).toBe(404);
    })
})
