const { create , createImage , update , updateImage} = require('./../models/empleadosM');
const { imgFile } = require('./../utils/fileHandler');

const createEmpleado = async(body, file) => {
    try {
        //console.log(body,file);
        const {insertId: id_empleado} = await create(body);
        const uid = imgFile(file);
        //console.log(uid);
        const obj = {id_empleado, uid};
        const {insertId: idImg} = await createImage(obj);
        return idImg;
    }catch(e) {
        console.error(e)
    }
}

const updateEmpleado = async(id, body, file) => {
    try {
        //console.log(body,file);
        const id_empleado = await update(id, body);
        if (file) {
            const uid = imgFile(file);
            const obj = {uid};
            const idImg = await updateImage(id, obj);
            return idImg;
        }
        else{
            return id_empleado;
        }
    }catch(e) {
        console.error(e)
    }
}

module.exports = {createEmpleado, updateEmpleado};