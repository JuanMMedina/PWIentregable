const express = require('express');
const router = express.Router();
const model = require('../../models/categoriasM')


const get = async (req, res) => {
    const categorias = await model.getAll();
    res.render('adminCategorias', {categorias});
}

const showCreate = (req, res) => {
    res.render('categoriaCreate',);
}

const create = async (req, res) => {
    const categoria = req.body;
    const {insertId} = await model.create(categoria);
    res.redirect('/admin/categorias');
}

const del = async (req, res) => {
    const {id} = req.params;
    const messageId = await model.del(id);
    res.redirect('/admin/categorias');
}

const showUpdate = async (req, res) => {
    const {id} = req.params;
    const [categoria] = await model.getSingle(id);
    console.log(categoria);
    res.render('categoriaUpdate', {categoria});
}

const update = async (req, res) => {
    const {id} = req.params;
    const {insertId} = await model.update(id, req.body);
    res.redirect('/admin/categorias');
}

router.get('/', get);
router.get('/create', showCreate);
router.post('/create', create);
router.get('/update/:id', showUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', del);

module.exports = router;