/**
 * Rutas de Usuarios  Auth
 * 
 * host + /api/auth
 */
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { 
    crearUsuario,
    loginUsuario,
    revalidarToken
} = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [
        check('name', 'Este campo es obligatorio').not().isEmpty(),
        check('email', 'Es necesario una dirección de correo valida.').isEmail(),
        check('password', 'La contraseña debe ser mayor a 6 caracteres.').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario);

router.post(
    '/',
    [
        check('email', 'Es necesario una dirección de correo valida.').isEmail(),
        check('password', 'La contraseña debe ser mayora 6 caracteres.').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario);
    
router.get('/renew', revalidarToken);

module.exports = router;
