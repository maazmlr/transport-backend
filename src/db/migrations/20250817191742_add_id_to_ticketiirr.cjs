/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("tickets", function (table) {
    table
      .uuid("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("tickets", function (table) {
    table.dropColumn("user_id");
  });
};
