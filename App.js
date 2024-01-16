const express = require('express');
const fs = require('fs');
const url = require('url');


const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, (req, res) => {
    console.log('Escuchando puerto:', PORT);
})

// Obtención de carpetas:

