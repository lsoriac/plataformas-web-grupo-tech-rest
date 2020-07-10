//importación de módulos
require('./config/config')
const express = require('express')
const app = express()

const morgan = require('morgan')

//módulo para manejar la bd
const mongoose = require('mongoose');

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json())

//incluir las rutas de impresora
app.use(require('../routes/impresora'))

//conexión con Mongo db
mongoose.connect(process.env.urlBD, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err
    console.log("Base de datos Online")
})

//cambia el puerto 
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
})