/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();


//Todas tienen que pasar por la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/', 
    [//middlewares
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualicar Evento
router.put(
    '/:id', 
    [//middlewares
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha inicio es obligatoria').custom(isDate),
    check('end', 'Fecha finalización es obligatoria').custom(isDate),
    validarCampos
    ],
    actualizarEvento);

// Borrar Evento
router.delete('/:id', eliminarEvento);


module.exports = router;