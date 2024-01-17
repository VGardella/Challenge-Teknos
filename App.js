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

app.get('/:name', (req, res) => {
    let file = req.params.name;
    fs.readFile('Modelos/' + file + '.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        // res.write(data);
        // return res.end();
    })
})

// Obtener mensajes:

app.get('/messages/:name', (req, res) => {
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
        let messages =  Object.entries(mailList.data);

        let filteredMess = []
        
        messages.forEach((message) => {
            if (filters['from'] !== '') {
                for (let sender in message[1]['from']) {
                    if (message[1]['from'][sender].includes(filters['from'])) {
                        filteredMess.push(message);
                }}
            }
            if (filters['to'] !== '') {
                for (let recipient in message[1]['to'][0]) {
                    if (message[1]['to'][0][recipient].includes(filters['to'])) {
                        filteredMess.push(message);
                    }
                }
            }
            if (filters['subject'] !== '') {
                if (message[1]['subject'].includes(filters['subject'])) {
                    filteredMess.push(message);
                }
            }
        })

        res.send(filteredMess);

    })
})