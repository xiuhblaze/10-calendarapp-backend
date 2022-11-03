const express = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/Usuario');
const { generarJWT, generateJWT } = require('../helpers/jwt');

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
    
        // Generar el JWT
        const token = await generateJWT(usuario.id, usuario.name);

        // Resultado Ok
        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });    
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ah ocurrido un error, consulte con el Administrador del sistema.'
        });
    }

};


const loginUsuario = async (req, res = express.response) => {
    const { email, password } = req.body;

    console.log('loginUsuario');
    try {
        // Validando contra la base de datos
        const usuario = await Usuario.findOne({ email });        
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe' //'El usuario y/o la contraseña no son validos.'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        console.log('validPassword', validPassword);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        console.log('token', token);
        res.json({
            ok: true,
            msg: 'login',
            uid: usuario.id,
            email,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Ah ocurrido un error, consulte con el Administrador del sistema.'
        });
    }   
};


const revalidarToken = async (req, res = express.response) => {
    const uid = req.uid;
    const name = req.name;    

    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
};


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}