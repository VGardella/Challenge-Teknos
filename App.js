const express = require('express');
const fs = require('fs');
const url = require('url');


const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
    console.log('Escuchando puerto:', PORT);
})

// Obtención de carpetas:

app.get('/folders', (req, res) => {
    fs.readFile('Modelos/folders.json', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    })
})