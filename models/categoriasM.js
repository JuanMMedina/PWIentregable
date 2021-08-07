const pool = require('../utils/db')

const get = async () => {
    try {

        const query = "SELECT * FROM ??"
        const params = [process.env.T_CATEGORIAS];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const getAll = async () => {
    try {

        const query = "SELECT c.id, c.nombre, c.descripcion FROM ?? AS `c` WHERE c.eliminado = 0"
        const params = [process.env.T_CATEGORIAS];
        const rows = await pool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

const getSingle = async (id) => {
    try {

        const query = "SELECT c.id, c.nombre, c.descripcion FROM ?? AS `c` WHERE c.id = ? AND c.eliminado = 0";
        const params = [process.env.T_CATEGORIAS, id];
        const result = await pool.query(query, params);
        return result;
    } catch (err) {
        console.error(err);
    }
}

const create = async (obj) => {
    try {

        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.T_CATEGORIAS, obj];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const update = async (id, obj) => {
    try {

        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_CATEGORIAS, obj, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const del = async (id) => {
    try {

        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_CATEGORIAS, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    get,
    getAll,
    create,
    del,
    getSingle,
    update
};