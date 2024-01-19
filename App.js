const express = require('express');
const fs = require('fs');
const url = require('url');


const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})

// Lectura de archivos:

app.get('/api/:name', (req, res) => {
    let file = req.params.name;
    fs.readFile('Modelos/' + file + '.json', function(err, data) {
        const newData = JSON.parse(data); // Se tiene que parsear porque los archivos tienen JSON strings y tengo que convertirlos al objeto correspondiente.
        res.send(newData.data);
    })
})

// Obtener mensajes:

app.get('/api/messages/:name', (req, res) => {
    let file = req.params.name;
    fs.readFile('Modelos/' + file + '.json', function(err, data) {
        let filters = { 'from': '',
                        'to': '',
                        'subject': ''
                    };

        let values = req.query;

        for (const key in filters) {
            if (key in values) {
                filters[key] = values[key];
            }
        }

        let mailList = JSON.parse(data);
        let messages =  mailList.data;

        let filteredMess = []

        messages.forEach((message) => {

            let temp = {
                'from': Object.entries(message['from']),
                'to': Object.entries(message['to'][0]),
                'subject': message['subject']
            }
            
            let approvedMess = true;

            for (let filter in filters) {
                if (filters[filter] !== '' && !JSON.stringify(temp[filter]).includes(filters[filter])) {
                    approvedMess = false;
                    break; // este break afecta al loop mas cercano (el for), dado que un if no es un bucle
                }
            }

            if (approvedMess && !filteredMess.includes(message)) {
                filteredMess.push(message);
            }

        })

        res.send(filteredMess);
    })
})

// Crear mensajes:

app.post('/api/messages/:name', (req, res) => {
    const file = req.params.name;
    const route = 'Modelos/' + file + '.json'
    const recivedData = req.body;

    fs.readFile(route, (err, data) => {
        const entries = JSON.parse(data).data;
        entries.push(recivedData);

        fs.writeFile(route, JSON.stringify({ data: entries }, null, 2), (err) => { // Lo ponemos como { data: entries } porque sino devuelve un array solo, para procesarlo necesitamos que el objeto sea { data: []}
            if (err) {
                console.log(err);
            }
            res.send('Message saved!')
        })
    })
})

// Borrar mensajes:

app.delete('/api/messages/:name/:id', (req, res) => {
    const file = req.params.name;
    const targetId = req.params.id;
    const route = 'Modelos/' + file + '.json';

    fs.readFile(route, (err, data) => {
        let messages = JSON.parse(data).data;
        
        let newList = messages.filter((message) => 
            message.id !== targetId
        )

        fs.writeFile(route, JSON.stringify({ data: newList }, null, 2), (err) => {
            if (err) {
                res.send(err);
            }
            res.send('Message deleted!')
        })
    })
})