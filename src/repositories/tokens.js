const pool = require("../pool")

class tokenRepo {
    static async insert(user_id, token) {
        const { rows } = await pool.query('INSERT INTO verfication_tokens (user_id, token) VALUES($1, $2) RETURNING *;', [user_id, token]);

        return rows;
    };
}


module.exports = tokenRepo;