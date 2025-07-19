// migrations/YYYYMMDDHHMMSS_alter_pickup_destination_to_jsonb.js

exports.up = async function (knex) {
  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup");
    table.dropColumn("destination");
  });

  await knex.schema.alterTable("rides", (table) => {
    table
      .jsonb("pickup")
      .notNullable()
      .defaultTo(JSON.stringify({ address: "", latitude: 0, longitude: 0 }));
    table
      .jsonb("destination")
      .notNullable()
      .defaultTo(JSON.stringify({ address: "", latitude: 0, longitude: 0 }));
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup");
    table.dropColumn("destination");
  });

  await knex.schema.alterTable("rides", (table) => {
    table.string("pickup", 255).notNullable();
    table.string("destination", 255).notNullable();
  });
};
