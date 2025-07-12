// migration file: add_required_vehicle_type_to_rides.js
exports.up = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.string("required_vehicle_type").notNullable().defaultTo("bike"); // example default
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.dropColumn("required_vehicle_type");
  });
};
