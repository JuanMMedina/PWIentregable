const express = require('express');
const router = express.Router();
const model = require('../models/localesM');

const get = async (req, res) => {
    const locales = await model.getAll();
    console.log(locales);
    res.render('localesV', {locales});
}

const single = async(req, res) => {
    const {id} = req.params;
    const [local]  = await model.getSingle(id);
    res.render('localV', {local})
}

const buscador = async(req, res) => {
    let {aBuscar} = req.body;
    aBuscar = '%' + aBuscar + '%';
    const [local] = await model.getNombre(aBuscar);
    res.render('localV', {local});
}

router.get('/', get);
router.get('/single/:id', single)
router.post('/', buscador);

module.exports = router;