// migrations/20250718113356_alter_users_location_to_json.cjs

exports.up = async function (knex) {
  // Step 1: Drop the old column
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("location");
  });

  // Step 2: Add the new column as jsonb
  await knex.schema.alterTable("users", (table) => {
    table
      .jsonb("location")
      .notNullable()
      .defaultTo(
        knex.raw(`'{"address": "", "latitude": 0, "longitude": 0}'::jsonb`)
      );
  });
};

exports.down = async function (knex) {
  // Step 1: Drop the jsonb column
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("location");
  });

  // Step 2: Revert back to varchar(255)
  await knex.schema.alterTable("users", (table) => {
    table.string("location", 255);
  });
};
