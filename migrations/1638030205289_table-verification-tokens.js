/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql(`
        CREATE TABLE verification_tokens(
            id serial PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            token VARCHAR()
        );
    `);
};

exports.down = pgm => {
    pgm.sql(`
        DROP TABLE verification_tokens;
    `);
};
