/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("email").unique();
    table.string("img_url");
    table.string("location");
    table.string("full_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("email");
    table.dropColumn("img_url");
    table.dropColumn("location");
    table.dropColumn("full_name");
  });
};
