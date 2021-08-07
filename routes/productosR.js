const express = require('express');
const router = express.Router();
const {getAll, getSingle, getNombre, getGroup} = require('../models/productosM');

const get = async (req, res) => {
    const productos = await getAll();
    console.log(productos);
    res.render('productosV', {productos});
}

const single = async(req, res) => {
    const {id} = req.params;
    console.log(id);
    const [producto]  = await getSingle(id);
    console.log(producto);
    res.render('productoV', {producto})
}

const group = async(req, res) => {
    const {nombreCategoria} = req.params;
    const productos  = await getGroup(nombreCategoria);
    console.log(productos);
    res.render('productosV', {productos})
}

const buscador = async(req, res) => {
    let {aBuscar} = req.body;
    aBuscar = '%' + aBuscar + '%';
    console.log(aBuscar);
    const productos = await getNombre(aBuscar);
    res.render('productosV', {productos});
}

router.get('/:nombreCategoria', group);
router.get('/', get);
router.get('/single/:id', single)
router.post('/', buscador);
module.exports = router;