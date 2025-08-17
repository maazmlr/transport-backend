// migration file: 20250817120000_add_user_id_to_tickets.js

exports.up = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table
      .uuid("user_id") // match type with users.id
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
