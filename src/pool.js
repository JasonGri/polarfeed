const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    database: 'polarFeed',
    user: 'postgres',
    password: 'Password',
    port: 5432,
    url: 'postgres://postgres:Password@localhost:5432/polarFeed',
});


module.exports = pool;