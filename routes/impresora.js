const express = require('express')
const _ = require('underscore')
const app = express()
const Impresora = require('../models/impresora');

app.get('/impresora', (req, res) => {
    Impresora.find({}, 'marca modelo serie color ip precio')
        .exec((err, impresoras) => {
            if (err) {
                //Error que está incorrecta la petición
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: 'Impresoras encontradas',
                impresora: impresoras
            })
        })
});

app.get('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.findById(id, 'marca modelo serie color ip precio')
        .exec((err, impresoraDB) => {
            if (err) {
                //Error que está incorrecta la petición
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: 'Impresora encontrada',
                impresora: impresoraDB
            })
        })
});

app.post('/impresora', (req, res) => {
    //obtener todo lo que venga en la petición
    let body = req.body
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        precio: body.precio
    })
    impresora.save((err, impresoraDB) => {
        if (err) {
            //Error que está incorrecta la petición
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            message: 'Impresora insertada correctamente',
            impresora: impresoraDB
        })
    })
});

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    //opción optimizada con el módulo underscore
    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio']);
    Impresora.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
            context: 'query'
        },
        (err, impresoraDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                message: 'Impresora encontrada y modificada',
                impresora: impresoraDB
            })
        })
});

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.findByIdAndDelete(id, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!impresoraDB) {
            res.json({
                ok: false,
                err: {
                    message: 'Impresora no encontrada'
                }
            })
        } else {
            res.json({
                ok: true,
                message: 'Impresora encontrada y eliminada',
                impresora: impresoraDB
            })
        }
    })
});

module.exports = app