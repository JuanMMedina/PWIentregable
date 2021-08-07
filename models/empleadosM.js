const pool = require('../utils/db');

const create = (obj) => pool.query("INSERT INTO ?? SET ?", [process.env.T_EMPLEADOS, obj]).then(response => response).catch(err => console.error(err));

const createImage = (obj) => pool.query("INSERT INTO ?? SET ?", [process.env.T_EMPLEADOSIMG, obj]).then(response => response).catch(err => console.error(err));

const getAll = async () => {
    try{
        const query = "SELECT e.id, e.nombre, e.apellido, e.telefono, e.mail, e.direccion, ei.uid AS uuid FROM ?? AS e JOIN ?? AS ei ON e.id = ei.id_empleado WHERE e.eliminado = 0";
        const params = [process.env.T_EMPLEADOS, process.env.T_EMPLEADOSIMG];
        return await pool.query(query, params);    
    }catch(err){
        console.error(err);
    }
}

const getSingle = async (id) => {
    try{
        const query = "SELECT e.id, e.nombre, e.apellido, e.telefono, e.mail, e.direccion, ei.uid AS uuid FROM ?? AS e JOIN ?? AS ei ON e.id = ei.id_empleado WHERE e. id = ? AND e.eliminado = 0";
        const params = [process.env.T_EMPLEADOS, process.env.T_EMPLEADOSIMG, id];
        return await pool.query(query, params);    
    }catch(err){
        console.error(err);
    }
}

const deleteEmp = async (id) => {
    try{
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_EMPLEADOS, id];
        return await pool.query(query, params);    
    }catch(err){
        console.error(err);
    }
}

const deleteImg = async (id) => {
    try{
        const query = "UPDATE ?? SET eliminado = 1 WHERE id_empleado = ?";
        const params = [process.env.T_EMPLEADOSIMG, id];
        return await pool.query(query, params);    
    }catch(err){
        console.error(err);
    }
}

const update = async (id, obj) => {
    try{
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_EMPLEADOS, obj, id];
        return pool.query(query, params);
    }
    catch(err){
        console.error(err)
    }
}

const updateImage = async (id, obj) => {
    try{
        const query = "UPDATE ?? SET ? WHERE id_empleado = ?";
        const params = [process.env.T_EMPLEADOSIMG, obj, id];
        return pool.query(query, params);
    }
    catch(err){
        console.error(err)
    }
}

module.exports = {create, createImage, getAll, getSingle, deleteEmp, deleteImg, update, updateImage};