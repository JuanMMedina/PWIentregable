const pool = require('../utils/db');

const getAll = async () => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.calorias_kcal, p.grasa_total_g, p.carbo_total_g, p.proteinas_g, p.peso_aprox_g, p.sal_mg, c.nombre AS nombreCategoria, pi.uid AS uuid FROM ?? AS `p` INNER JOIN ?? AS pi ON pi.id_producto = p.id INNER JOIN ?? AS `c` ON p.id_categoria = c.id WHERE p.eliminado = 0"
        const params = [process.env.T_PRODUCTOS, process.env.T_PRODUCTOSIMG, process.env.T_CATEGORIAS];
        const rows = await pool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

const getGroup = async (cat) => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.calorias_kcal, p.grasa_total_g, p.carbo_total_g, p.proteinas_g, p.peso_aprox_g, p.sal_mg, c.nombre AS nombreCategoria, pi.uid AS uuid FROM ?? AS p INNER JOIN ?? AS pi ON pi.id_producto = p.id INNER JOIN ?? AS c ON p.id_categoria = c.id WHERE c.nombre = ? AND p.eliminado = 0";
        const params = [process.env.T_PRODUCTOS, process.env.T_PRODUCTOSIMG, process.env.T_CATEGORIAS, cat];
        const rows = await pool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

const getSingle = async (id) => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.calorias_kcal, p.grasa_total_g, p.carbo_total_g, p.proteinas_g, p.peso_aprox_g, p.sal_mg, c.nombre AS nombreCategoria, pi.uid AS uuid FROM ?? AS `p` INNER JOIN ?? AS pi ON pi.id_producto = p.id INNER JOIN ?? AS `c` ON p.id_categoria = c.id WHERE p.id = ? AND p.eliminado = 0";
        const params = [process.env.T_PRODUCTOS, process.env.T_PRODUCTOSIMG, process.env.T_CATEGORIAS, id];
        const result = await pool.query(query, params);
        return result;
    } catch (err) {
        console.error(err);
    }
}

const create = async (obj) => {
    try {
        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.T_PRODUCTOS, obj];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const update = async (id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_PRODUCTOS, obj, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const deleteProd = async (id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_PRODUCTOS, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const getNombre = async (nombre) => {
    try {
        const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.calorias_kcal, p.grasa_total_g, p.carbo_total_g, p.proteinas_g, p.peso_aprox_g, p.sal_mg, c.nombre AS nombreCategoria, pi.uid AS uuid FROM ?? AS p INNER JOIN ?? AS pi ON pi.id_producto = p.id INNER JOIN ?? AS c ON p.id_categoria = c.id WHERE p.nombre LIKE ? AND p.eliminado = 0";
        const params = [process.env.T_PRODUCTOS, process.env.T_PRODUCTOSIMG, process.env.T_CATEGORIAS, nombre];
        const rows = await pool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

const createImage = (obj) => pool.query("INSERT INTO ?? SET ?", [process.env.T_PRODUCTOSIMG, obj]).then(response => response).catch(err => console.error(err));

const updateImage = async () => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_PRODUCTOS, obj, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err)
    }
}

const deleteImg = async (id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id_producto = ?";
        const params = [process.env.T_PRODUCTOSIMG, id];
        return await pool.query(query, params);

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAll,
    getGroup,
    getSingle,
    create,
    update,
    deleteProd,
    getNombre,
    createImage,
    updateImage,
    deleteImg
}