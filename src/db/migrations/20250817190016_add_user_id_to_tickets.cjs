// migration file: e.g. 20250817120000_add_user_id_to_tickets.js

exports.up = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

exports.down = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table.dropColumn("user_id");
  });
};
