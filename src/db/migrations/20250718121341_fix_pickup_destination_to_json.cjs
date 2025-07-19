exports.up = async function (knex) {
  // TEMP: rename columns to keep old data
  await knex.schema.alterTable("rides", (table) => {
    table.renameColumn("pickup", "pickup_old");
    table.renameColumn("destination", "destination_old");
  });

  // Add new JSONB columns
  await knex.schema.alterTable("rides", (table) => {
    table
      .jsonb("pickup")
      .notNullable()
      .defaultTo(
        JSON.stringify({ address: "", latitude: 0, longitude: 0 })
      );
    table
      .jsonb("destination")
      .notNullable()
      .defaultTo(
        JSON.stringify({ address: "", latitude: 0, longitude: 0 })
      );
  });

  // Optional: Migrate old data into new format
  await knex("rides").update({
    pickup: knex.raw(
      `jsonb_build_object('address', pickup_old, 'latitude', 0, 'longitude', 0)`
    ),
    destination: knex.raw(
      `jsonb_build_object('address', destination_old, 'latitude', 0, 'longitude', 0)`
    ),
  });

  // Drop old columns
  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup_old");
    table.dropColumn("destination_old");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("rides", (table) => {
    table.string("pickup_old", 255);
    table.string("destination_old", 255);
  });

  await knex("rides").update({
    pickup_old: knex.raw(`pickup->>'address'`),
    destination_old: knex.raw(`destination->>'address'`),
  });

  await knex.schema.alterTable("rides", (table) => {
    table.dropColumn("pickup");
    table.dropColumn("destination");
    table.renameColumn("pickup_old", "pickup");
    table.renameColumn("destination_old", "destination");
  });
};
