const pool = require('../utils/db');

const getAll = async () => {
    try {
        const query = "SELECT l.id, l.nombre, l.direccion, l.localidad, l.telefono, l.mail FROM ?? AS l WHERE l.eliminado = 0"
        const params = [process.env.T_LOCALES];
        const rows = await pool.query(query, params);
        return rows;
    } catch (err) {
        console.error(err);
    }
}

const getSingle = async (id) => {
    try {
        const query = "SELECT l.id, l.nombre, l.direccion, l.localidad, l.telefono, l.mail FROM ?? AS l WHERE l.id = ? AND l.eliminado = 0"
        const params = [process.env.T_LOCALES, id];
        const result = await pool.query(query, params);
        return result;
    } catch (err) {
        console.error(err);
    }
}

const create = async (obj) => {
    try {
        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.T_LOCALES, obj];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const update = async (id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_LOCALES, obj, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const del = async (id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_LOCALES, id];
        return pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const getNombre = async (nombre) => {
    try {
        "SELECT l.id, l.nombre, l.direccion, l.localidad, l.telefono, l.mail FROM ?? AS l WHERE l.nombre LIKE ? AND l.eliminado = 0"
        const params = [process.env.T_LOCALES, nombre];
        const result = await pool.query(query, params);
        return result;
    } catch (err) {
        console.error(err);
    }
}


module.exports = {
    getAll,
    getSingle,
    create,
    update,
    del,
    getNombre
}