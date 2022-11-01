const express = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = express.response) => {
    const { name, email, password } = req.body;
    
    try {
        // Validando contra la base de datos
        let usuario = await Usuario.findOne({ email });        
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'La dirección de correo electrónico, ya esta en uso.'
            });
        }

        // OK, crear el nuevo usuario
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardando el usuario
        await usuario.save();
    
        // Resultado Ok
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        });    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ah ocurrido un error, consulte con el Administrador del sistema.'
        });
    }

};

const loginUsuario = (req, res = express.response) => {
    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const revalidarToken = (req, res = express.response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}