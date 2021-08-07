const express = require('express');
const router = express.Router();
const {getSingle} = require('../models/usuariosM');

const getUser = async (req, res, next) =>{
    const [usuario] = await getSingle(req.session.user);
    res.render('usuario', {usuario});
}

router.get('/', getUser);
module.exports = router;