const express = require('express');
const router = express.Router();
const model = require('../models/usuariosM');
const sha1 = require('sha1');
const {v4: uuid} = require('uuid');
const {send} = require('./../services/mail');
const {validateRegistro} = require('../middlewares/usuariosMid');

const showRegistro = (req, res) => {
    res.render('registroV');
}

const crearUser = async (req, res) => {

    const usuarioR = req.body;
    console.log(usuarioR);
    const uid = uuid();
    let duplicado = false;

    const usuarioFinal = {
        nombre: usuarioR.nombre,
        apellido: usuarioR.apellido,
        telefono: usuarioR.telefono,
        mail: usuarioR.mail,
        pass: sha1(usuarioR.pass),
        direccion: usuarioR.direccion,
        correoValidacion: uid,        
    }
    
    console.log(usuarioFinal);
    

    //verifica si el mail ya existe en la bd
    const usuariosExistentes = await model.getAll();
    usuariosExistentes.forEach(usuario => {
        if(usuario.mail == usuarioFinal.mail){
            duplicado = true;
        }
    })

    if(!duplicado){
        const agregado = await model.create(usuarioFinal);
        console.log(agregado);

        send({mail : usuarioFinal.mail,
            cuerpo: 
            `<h1> Bienvenido ${usuarioFinal.nombre} ${usuarioFinal.apellido}</h1>
            <a href=${process.env.URL_SERVER}:${process.env.PORT}/registro/verify/${usuarioFinal.correoValidacion}> Link para confirmar registracion. </a>`});
        res.redirect('/');
        return;
    }
    res.render('registroV', {message: 'Ya existe un usuario con ese email en el sistema.'})
    return;
}

const verificar = async (req, res) => {
    const {uid} = req.params;
    console.log(uid);
    const messageId = await model.verify(uid);
    res.redirect('/');
}


router.get('/', showRegistro);
router.post('/', validateRegistro, crearUser);
router.get('/verify/:uid', verificar);
module.exports = router;
