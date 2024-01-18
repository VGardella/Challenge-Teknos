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
        res.send(data);
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
            let temp = {
                'from': Object.entries(message[1]['from']),
                'to': Object.entries(message[1]['to'][0]),
                'subject': message[1]['subject']
            }
            
            let approvedMess = true;

            for (let filter in filters) {
                if (filters[filter] !== '' && !JSON.stringify(temp[filter]).includes(filters[filter])) {
                    approvedMess = false;
                    break;
                }
            }

            if (approvedMess && !filteredMess.includes(message)) {
                filteredMess.push(message);
            }

            console.log(approvedMess);
        })

        res.send(filteredMess);


    })
})