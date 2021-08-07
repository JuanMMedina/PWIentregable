const { create , createImage , update , updateImage} = require('./../models/productosM');
const { imgFile } = require('./../utils/fileHandler');

const createProducto = async(body, file) => {
    try {
        //console.log(body,file);
        const {insertId: id_producto} = await create(body);
        const uid = imgFile(file);
        //console.log(uid);
        const obj = {id_producto, uid};
        const {insertId: idImg} = await createImage(obj);
        return idImg;
    }catch(e) {
        console.error(e)
    }
}

const updateProducto = async(id, body, file) => {
    try {
        //console.log(body,file);
        const id_producto = await update(id, body);
        if (file) {
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await updateImage(id, obj);
            return idImg;
        }
        else{
            return id_producto;
        }
    }catch(e) {
        console.error(e)
    }
}

module.exports = {createProducto, updateProducto};