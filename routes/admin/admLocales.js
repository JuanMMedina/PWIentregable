const express = require('express');
const router = express.Router();
const model = require('../../models/localesM')


const get = async (req, res) => {
    const locales = await model.getAll();
    res.render('adminLocales', {locales});
}

const showCreate = (req, res) => {
    res.render('localesCreate',);
}

const create = async (req, res) => {
    const locales = req.body;
    const {insertId} = await model.create(locales);
    res.redirect('/admin/locales');
}

const del = async (req, res) => {
    const {id} = req.params;
    const messageId = await model.del(id);
    res.redirect('/admin/locales');
}

const showUpdate = async (req, res) => {
    const {id} = req.params;
    const [local] = await model.getSingle(id);
    res.render('localesUpdate', {local});
}

const update = async (req, res) => {
    const {id} = req.params;
    const {insertId} = await model.update(id, req.body);
    res.redirect('/admin/locales');
}

router.get('/', get);
router.get('/create', showCreate);
router.post('/create', create);
router.get('/update/:id', showUpdate);
router.post('/update/:id', update);
router.get('/delete/:id', del);

module.exports = router;