const request = require('supertest');
const express = require('express');
const app = require('./App');

const test = {
    "id": "1541dd1e05dfc439216",
    "from": {
      "name": "Test Name",
      "avatar": "assets/images/avatars/vincent.jpg",
      "email": "testmail@creapond.com"
    },
    "to": [
      {
        "name": "me",
        "email": "johndoe@creapond.com"
      }
    ],
    "subject": "Commits that need to be pushed lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "message": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lorem diam, pulvinar id nisl non, ultrices maximus nibh. Suspendisse ut justo velit. Nullam ac ultrices risus, quis auctor orci. Vestibulum volutpat nisi et neque porta ullamcorper. Maecenas porttitor porta erat ac suscipit. Sed cursus leo ut elementum fringilla. Maecenas semper viverra erat, vel ullamcorper dui efficitur in. Vestibulum placerat imperdiet tellus, et tincidunt eros posuere eget. Proin sit amet facilisis libero. Nulla eget est ut erat aliquet rhoncus. Quisque ac urna vitae dui hendrerit sollicitudin vel id sem. </p><p> In eget ante sapien. Quisque consequat velit non ante finibus, vel placerat erat ultricies. Aliquam bibendum justo erat, ultrices vehicula dolor elementum a. Mauris eu nisl feugiat ligula molestie eleifend. Aliquam efficitur venenatis velit ac porta. Vivamus vitae pulvinar tellus. Donec odio enim, auctor eget nibh mattis, ultricies dignissim lacus. Phasellus non tincidunt dui. Nulla eu arcu lorem. </p><p> Donec non hendrerit augue, lobortis sollicitudin odio. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis sit amet euismod enim, eget vestibulum justo. Fusce a placerat lectus, eget feugiat purus. Cras risus ante, faucibus eget justo commodo, volutpat tempor ante. Donec sit amet leo venenatis, gravida quam sit amet, blandit dui. In quam ante, elementum ut faucibus nec, tristique vitae dui. Praesent vel erat at enim placerat luctus vel ut ipsum. In congue tempor mi, non ornare lectus condimentum at. Aenean libero diam, finibus eget sapien et, tristique fermentum lorem. </p>",
    "time": "28 Jun",
    "read": true,
    "starred": false,
    "important": false,
    "hasAttachments": false,
    "labels": []
}

// funcionamiento general:

describe('Endpoint', () => {
    it('devuelve código de status 200',
    async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    })
})

// Lectura de archivos:

describe('Endpoint', () => {
    it('devuelve código de status 200',
    async () => {
        const response = await request(app).get('/teknos/api/folders');
        expect(response.statusCode).toBe(200);
    })

    it('devuelve código de status 404',
    async () => {
        const response = await request(app).get('/:user/api/folders');
        expect(response.statusCode).toBe(404);
    })

    it('devuelve código de status 404',
    async () => {
        const response = await request(app).get('/api/folders');
        expect(response.statusCode).toBe(404);
    })
})

// Lectura de mensajes:

describe('Endpoint', () => {
    it('devuelve código de status 200',
    async () => {
        const response = await request(app).get('/teknos/api/messages/sent');
        expect(response.statusCode).toBe(200);
    })

    it('devuelve código de status 404',
    async () => {
        const response = await request(app).get('/:user/api/messages/:name');
        expect(response.statusCode).toBe(404);
    })

    it('devuelve código de status 404',
    async () => {
        const response = await request(app).get('/api/messages/:name');
        expect(response.statusCode).toBe(404);
    })
})

// Creación de mensajes:

describe('Endpoint', () => {
    it('devuelve código de status 200',
    async () => {
        const response = await request(app).post('/teknos/api/messages/sent');
        expect(response.statusCode).toBe(200);
    })

    it('devuelve código de status 404',
    async () => {
        const response = await request(app).post('/:user/api/messages/sent');
        expect(response.statusCode).toBe(404);
    })
})

describe('Creación de mensajes', () => {
    it('Envia correctamente el mensaje',
    async () => {        
        const response = await request(app).post('/teknos/api/messages/sent').send(test)
        expect(response.request["_data"]).toEqual(test);
        expect(response.request["_data"].message).toBe(test.message);
        expect(Object.keys(response.request["_data"])).toEqual(Object.keys(test));
    });
})