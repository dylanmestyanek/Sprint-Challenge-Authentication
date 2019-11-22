const db = require("../database/dbConfig");

module.exports = {
    get,
    getByUsername,
    add
}

function get(id) {
    if (id) {
        return db('users')
            .select('id', 'username')
            .where({ id })
            .first();
    } else {
        return db('users')
            .select('id', 'username');
    }
};

function getByUsername(username) {
    return db('users')
        .where({ username })
        .first();
};

async function add(user) {
    const [id] = await db('users')
        .insert(user);
    
        return await get(id);
};