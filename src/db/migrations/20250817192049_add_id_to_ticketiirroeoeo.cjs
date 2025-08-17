exports.up = async function (knex) {
  await knex.raw(`
    ALTER TABLE tickets
    ADD COLUMN user_id uuid REFERENCES users(id) ON DELETE CASCADE
  `);
};

exports.down = async function (knex) {
  await knex.raw(`
    ALTER TABLE tickets DROP COLUMN user_id
  `);
};
