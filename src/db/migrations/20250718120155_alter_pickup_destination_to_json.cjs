// migrations/YYYYMMDD_HHmmss_alter_pickup_destination_to_json.cjs

exports.up = async function (knex) {
  // Drop old varchar columns
  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup");
    table.dropColumn("destination");
  });

  // Add new jsonb columns with default values
  await knex.schema.alterTable("rides", (table) => {
    table
      .jsonb("pickup")
      .notNullable()
      .defaultTo(
        knex.raw(`'{"address": "", "latitude": 0, "longitude": 0}'::jsonb`)
      );
    table
      .jsonb("destination")
      .notNullable()
      .defaultTo(
        knex.raw(`'{"address": "", "latitude": 0, "longitude": 0}'::jsonb`)
      );
  });
};

exports.down = async function (knex) {
  // Rollback: drop jsonb and restore varchar columns
  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup");
    table.dropColumn("destination");
  });

  await knex.schema.alterTable("rides", (table) => {
    table.string("pickup", 255);
    table.string("destination", 255);
  });
};
