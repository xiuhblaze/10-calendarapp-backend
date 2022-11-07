/**
 * Rutas de Eventos
 * 
 * host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

const {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events');

router.use(validarJWT); // Cualquier ruta despues de esta instrucción debe ser validada para que tenga el token

// Rutas 

router.get('/', obtenerEventos);

router.post(
    '/',
    [
        check('title', 'Este campo es obligatorio').not().isEmpty(),
        check('start', 'Inicio no es una fecha valida').custom(isDate),
        check('end', 'Fin no es una fecha valida').custom(isDate),
        validarCampos
    ],
    crearEvento
);

router.put(
    '/:id',
    [
        check('title', 'Este campo es obligatorio').not().isEmpty(),
        check('start', 'Inicio no es una fecha valida').custom(isDate),
        check('end', 'Fin no es una fecha valida').custom(isDate),
        validarCampos
    ],
    actualizarEvento
);

router.delete('/:id', eliminarEvento);

module.exports = router;