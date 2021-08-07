const Joi = require('@hapi/joi');

const schemes = {
    login: Joi.object().keys({
        mail: Joi.string().required(),
        pass: Joi.string().min(3).max(20).required(),
    }),
    registro: Joi.object().keys({
        nombre: Joi.string().required(),
        apellido: Joi.string().required(),
        telefono: Joi.number().required(),
        mail: Joi.string().email().required(),
        pass: Joi.string().min(3).max(20).required(),
        direccion: Joi.string().required(),
    })
}



module.exports = {schemes};