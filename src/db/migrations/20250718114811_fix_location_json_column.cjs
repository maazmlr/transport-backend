exports.up = async function (knex) {
  // Drop the column (if still varchar)
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("location");
  });

  // Re-add as JSONB
  await knex.schema.alterTable("users", (table) => {
    table
      .jsonb("location")
      .notNullable()
      .defaultTo(
        JSON.stringify({
          address: "",
          latitude: 0,
          longitude: 0,
        })
      );
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("location");
    table.string("location", 255); // revert to old format
  });
};
