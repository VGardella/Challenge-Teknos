const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})

// Lectura de archivos:

app.get('/:user/api/:name', (req, res) => {
    if (req.params.user !== 'teknos') {
        res.send('Usuario equivocado.')
    } else {
        let file = req.params.name;
        fs.readFile('Modelos/' + file + '.json', function(err, data) {
            if (err) {
                return res.send('Error al abrir el archivo: nombre equivocado.');
            }
            
            const newData = JSON.parse(data);
            res.send(newData.data);
        })
    }

})

// Obtener mensajes:

app.get('/:user/api/messages/:name', (req, res) => {
    if (req.params.user !== 'teknos') {
        res.send('Usuario equivocado.')
    } else {
        let file = req.params.name;
        if (Object.keys(req.query).length === 0) {
            fs.readFile('Modelos/' + file + '.json', function(err, data) {
                if (err) {
                    return res.send('Error al abrir el archivo: nombre equivocado.');
                }
    
                const newData = JSON.parse(data);
                res.send(newData.data);
            })
        } else {
            fs.readFile('Modelos/' + file + '.json', function(err, data) {
                if (err) {
                    return res.send('Error al abrir el archivo: nombre equivocado.');
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
        
                let response = []
        
                messages.forEach((message) => {
                    if (!message['from'] || !message['to'][0] || !message['subject']) {
                        response = 'Error: uno o más mensajes tienen un formato equivocado.';
                    } else {
                        let temp = {
                            'from': message['from'],
                            'to': message['to'][0],
                            'subject': message['subject']
                        }
                        
                        let approvedMess = true;
            
                        for (let filter in filters) {
                            if (filters[filter] !== '' && !JSON.stringify(temp[filter]).toLowerCase().includes(filters[filter].toLowerCase())) {
                                approvedMess = false;
                                break;
                            }
                        }
            
                        if (approvedMess && !response.includes(message)) {
                            response.push(message);
                        }
                    }
                })
        
                res.send(response);
            })
        }
    }
})

// Crear mensajes:

app.post('/:user/api/messages/:name', (req, res) => {
    if (req.params.user !== 'teknos') {
        res.send('Usuario equivocado.')
    } else {
        const file = req.params.name;
        const route = 'Modelos/' + file + '.json'
        const recivedData = req.body;
    
        fs.readFile(route, (err, data) => {
            if (err) {
                return res.send('Error al abrir el archivo: nombre equivocado.');
            }
    
            const entries = JSON.parse(data).data;
            entries.push(recivedData);
    
            fs.writeFile(route, JSON.stringify({ data: entries }, null, 2), (err) => {
                if (err) {
                    console.log('Error al reescribir el archivo.');
                }
    
                res.send('Mensaje guardado.')
            })
        })
    }
})

// Borrar mensajes:

app.delete('/:user/api/messages/:name/:id', (req, res) => {
    if (req.params.user !== 'teknos') {
        res.send('Usuario equivocado.')
    } else {
        const file = req.params.name;
        const targetId = req.params.id;
        const route = 'Modelos/' + file + '.json';
    
        fs.readFile(route, (err, data) => {
            if (err) {
                return res.send('Error al abrir el archivo: nombre equivocado.')
            }
    
            let messages = JSON.parse(data).data;
            
            let newList = messages.filter((message) => 
                message.id !== targetId
            )
    
            fs.writeFile(route, JSON.stringify({ data: newList }, null, 2), (err) => {
                if (err) {
                    res.send('Error al reescribir el archivo.');
                }
    
                res.send('Mensaje borrado.')
            })
        })
    }
})