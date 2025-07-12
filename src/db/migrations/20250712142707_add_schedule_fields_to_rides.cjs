// migration: add_schedule_fields_to_rides.js

exports.up = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.timestamp("ride_datetime").notNullable(); // when the ride is scheduled
    table.integer("duration_days").notNullable().defaultTo(1); // how long the ride lasts
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.dropColumn("ride_datetime");
    table.dropColumn("duration_days");
  });
};
