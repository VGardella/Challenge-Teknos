const express = require('express');
const fs = require('fs');

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
        if (err) {
            return res.send('Error: ', err);
        }
        
        const newData = JSON.parse(data);
        res.send(newData.data);

    })
})

// Obtener mensajes:

app.get('/api/messages/:name', (req, res) => {
    let file = req.params.name;
    fs.readFile('Modelos/' + file + '.json', function(err, data) {

        if (err) {
            return res.send('Error: ', err);
        }

        let filters = { 
                        'from': '',
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
            let temp = null;

            try {
                temp = {
                    'from': message['from'],
                    'to': message['to'][0],
                    'subject': message['subject']
                }
            }
            catch (error) {
                res.send('El objeto no tiene alguno de los campos necesarios.');
                return;
            }
            
            let approvedMess = true;

            for (let filter in filters) {
                if (filters[filter] !== '' && !JSON.stringify(temp[filter]).toLowerCase().includes(filters[filter].toLowerCase())) {
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

        if (err) {
            return res.send('Error: ', err);
        }

        const entries = JSON.parse(data).data;
        entries.push(recivedData);

        fs.writeFile(route, JSON.stringify({ data: entries }, null, 2), (err) => {
            if (err) {
                console.log('Error: ', err);
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
        if (err) {
            return res.send('Error: ', err)
        }

        let messages = JSON.parse(data).data;
        
        let newList = messages.filter((message) => 
            message.id !== targetId
        )

        fs.writeFile(route, JSON.stringify({ data: newList }, null, 2), (err) => {
            if (err) {
                res.send('Error: ', err);
            }

            res.send('Message deleted!')
        })
    })
})