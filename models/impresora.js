const mongoose = require('mongoose')

let Schema = mongoose.Schema
let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, "La marca es requerida"]
    },
    modelo: {
        type: String,
        required: [true, "El modelo es requerido"],
    },
    serie: {
        type: Number,
        required: [true, "El número de serie es requerido"]
    },
    color: {
        type: Boolean,
        default: false
    },
    ip: {
        type: String,
        required: [true, "La ip es requerida"]
            //unique: true
    },
    contador: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"]
    }
})

module.exports = mongoose.model('Impresora', impresoraSchema);