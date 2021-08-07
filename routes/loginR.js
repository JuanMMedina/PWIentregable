const express = require('express');
const router = express.Router();
const {auth} = require('../models/usuariosM');
const sha1 = require('sha1');
const {validateLogin} = require('../middlewares/usuariosMid');

const showLogin = (req, res) => {
    res.render('loginV',);
}

const login = async(req, res) => {
    try{
    let {mail, pass} = req.body;
    pass = sha1(pass);
    const [logged] = await auth(mail, pass);

    if(logged!=null){
        const {id, admin} = logged;
        console.log(logged);
        
            req.session.user = id;
            req.session.admin = admin;
            if(logged.admin == 1){
                res.redirect('/admin');
                return;
            }
            res.redirect('../');
            return;
        }
        res.render('loginV', {message:`Email o contraseña incorrecta; o usuario no activado.`});   
    }
    catch (e){
        console.log(e);
    }    
}

router.get('/', showLogin);
router.post('/', validateLogin, login);
module.exports = router;