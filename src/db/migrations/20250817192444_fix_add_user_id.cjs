// 20250817191414_add_user_id_to_tickets.js

exports.up = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table.dropColumn("user_id");
  });
};
