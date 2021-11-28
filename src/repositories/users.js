const pool = require('../pool');

class UserRepo {
    // return a list of all users
    static async find() {
        //result is an object with multiple info in it 
        const { rows } = await pool.query('SELECT * FROM users ORDER BY id ASC;');
        //the actual array/ the data we care about is given by: result.rows
        return rows;
    };

    // return a specified by id user
    static async findById(id) {
        const { rows } = await pool.query(`SELECT * FROM users WHERE users.id = $1;`, [id]);

        return rows;
    };

    // return a specified by email user
    static async findByEmail(email) {
        const { rows } = await pool.query(`SELECT * FROM users WHERE users.email = $1;`, [email]);

        return rows;
    }

    // insert a user and return their info
    static async insert(username, password, email) {
        const { rows } = await pool.query('INSERT INTO users (username, password, email) VALUES($1, $2, $3) RETURNING *;', [username, password, email]);

        return rows;
    };

    // update a user's info and return that info
    static async update(column, id) {
        const { rows } = await pool.query(`UPDATE users SET $1 WHERE users.id = $2 RETURNING *;`, [column, id]);

        return rows;
    };

    // delete a user and return their info
    static async delete(id) {
        const { rows } = await pool.query(`DELETE FROM users WHERE users.id = $1 RETURNING *;`, [id]);

        return rows;
    };


};

module.exports = UserRepo;


//the static keyword makes functions only callable from the class itself(without object instantiation)