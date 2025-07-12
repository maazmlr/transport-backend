// migrations/xxxx_add_status_to_rides.js

exports.up = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table
      .enum("status", ["pending", "accepted", "completed", "cancelled"])
      .defaultTo("pending")
      .notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.dropColumn("status");
  });
};
