/* eslint-disable camelcase */


exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE users(
            id serial PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(20) NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(150), 
            bio VARCHAR(12), 
            phone VARCHAR(30), 
            status VARCHAR(10), 
            is_verified BOOLEAN DEFAULT FALSE
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE users;
    `);
};