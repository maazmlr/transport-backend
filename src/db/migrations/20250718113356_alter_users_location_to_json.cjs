// { address: string, latitude: number, longitude: number }

exports.up = async function (knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("location");
  });

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
    table.string("location", 255); // revert to varchar if needed
  });
};
