const express = require('express');

const Evento = require('../models/Evento');

const obtenerEventos = async (req, res = express.response) => {

    const eventos = await Evento
        .find()
        .populate('user', 'name');
        // .populate('user', 'name password');

    res.json({
        ok: true,
        eventos
    });
};

const crearEvento = async (req, res = express.response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido una excepción, contacte con los administradores del sistema.'
        });
    }
};

const actualizarEvento = async (req, res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe.'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no puede editar este evento.'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido una excepción, contacte con los administradores del sistema.'
        });
    }
};

const eliminarEvento = async (req, res = express.response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe.'
            });
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no puede eliminar este evento.'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

        res.json({
            ok: true,
            evento: eventoEliminado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido una excepción, contacte con los administradores del sistema.'
        });
    }
};

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};