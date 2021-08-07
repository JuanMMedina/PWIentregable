const pool = require('../utils/db');

const create = async (obj) => {
    try {
        const query = "INSERT INTO ?? SET ?";
        const params = [process.env.T_USUARIOS, obj];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const verify = async (uid) => {
    try {
        const query = "UPDATE ?? SET validado = 1 WHERE correoValidacion = ?"
        const params = [process.env.T_USUARIOS, uid]
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const auth = async (mail, pass) => {
    try {
        const query = "SELECT id, mail, pass, admin FROM ?? WHERE mail = ? AND pass = ? AND validado = 1 AND eliminado = 0";
        const params = [process.env.T_USUARIOS, mail, pass];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const getSingle = async (id) => {
    try {
        const query = "SELECT * FROM ?? WHERE id = ? AND eliminado = 0";
        const params = [process.env.T_USUARIOS, id];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const update = async (id, obj) => {
    try {
        const query = "UPDATE ?? SET ? WHERE id = ?";
        const params = [process.env.T_USUARIOS, obj, id];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const del = async (id) => {
    try {
        const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
        const params = [process.env.T_USUARIOS, id];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

const getAll = async (id) => {
    try {
        const query = "SELECT * FROM ?? WHERE eliminado = 0";
        const params = [process.env.T_USUARIOS];
        return await pool.query(query, params);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    create,
    verify,
    auth,
    getSingle,
    update,
    getAll,
    del
};