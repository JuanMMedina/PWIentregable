const express = require('express');
const router = express.Router();
const model = require('../../models/usuariosM')
const sha1 = require('sha1');


const get = async (req, res) => {
    const usuarios = await model.getAll();
    res.render('adminUsuarios', {usuarios});
}

const showCreate = (req, res) => {
    res.render('usuarioCreate');
}

const create = async (req, res) => {
    let usuario = req.body;
    usuario.validado = 1;
    usuario.pass = sha1(usuario.pass);
    const {insertId} = await model.create(usuario);
    res.redirect('/admin/usuarios');
}

const del = async (req, res) => {
    const {id} = req.params;
    const messageId = await model.del(id);
    res.redirect('/admin/usuarios');
}

const showUpdate = async (req, res) => {
    const {id} = req.params;
    const [usuario] = await model.getSingle(id);
    res.render('usuarioUpdate', {usuario});
}

const update = async (req, res) => {
    const {id} = req.params;
    let uptUser = req.body;
    uptUser.pass = sha1(uptUser.pass);
    const {insertId} = await model.update(id, uptUser);
    res.redirect('/admin/usuarios');
}

router.get('/', get);
router.get('/create', showCreate);
router.post('/create', create);
router.get('/update/:id', showUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', del);

module.exports = router;