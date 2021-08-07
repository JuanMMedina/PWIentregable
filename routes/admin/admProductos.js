const express = require('express');
const router = express.Router();
const multer = require('multer');
const model = require('../../models/productosM')
const modelCat = require('../../models/categoriasM')
const service = require('../../services/productosS')
const config = { dest: `./public/tmp`};
const upload = multer(config);


const get = async (req, res) => {
    const productos = await model.getAll();
    res.render('adminProductos', {productos});
}

const showCreate = async (req, res) => {
    const categorias = await modelCat.get();
    console.log(categorias);
    res.render('createProducto', {categorias});
}

const create = async (req, res) => {
    const idImg = await service.createProducto(req.body, req.file);
    res.redirect('admin/productos');
    console.log(req.file);
}


const del = async (req, res) => {
    const {id} = req.params;
    const msgProductos = await model.deleteProd(id);
    const msgImagen = await model.deleteImg(id);
    res.redirect('/admin/productos');
}

const getUpdate = async (req, res) => {
    const [producto] = await model.getSingle(req.params.id);
    const categorias = await modelCat.get();
    console.log(producto, categorias);
    res.render('updateProducto', {producto, categorias});
}

const update = async (req, res) => {
    console.log(req.body, req.file);
    const insertId = await service.updateProducto(req.params.id, req.body, req.file);
    console.log(insertId);
    res.redirect('/admin/productos');
}

router.get('/', get);
router.get('/create', showCreate);
router.post('/create', upload.single("imagen") , create);
router.get('/delete/:id', del);
router.get('/update/:id', getUpdate);
router.post('/update/:id', upload.single("imagen"), update);


module.exports = router;