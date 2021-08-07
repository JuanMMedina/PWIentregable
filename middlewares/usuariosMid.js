const {schemes} = require('./schemes/usuariosSche');

const validateLogin = (req, res, next) => {
    const {error, value} = schemes.login.validate(req.body);
    error ? res.render('loginV', {message: error.details[0].message}) : next();
}

const validateRegistro = (req, res, next) => {
    const {error, value} = schemes.registro.validate(req.body);
    error ? res.render('registroV', {message: error.details[0].message}) : next();
}

module.exports = {validateLogin, validateRegistro};