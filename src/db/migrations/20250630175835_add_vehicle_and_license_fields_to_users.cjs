/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("vehicle_info_url");
    table.string("vehicle_number");
    table.string("vehicle_model");
    table.string("license_url");
    table.string("license_number");
    table.date("license_valid"); // Or use table.boolean() if you just want true/false
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("vehicle_info_url");
    table.dropColumn("vehicle_number");
    table.dropColumn("vehicle_model");
    table.dropColumn("license_url");
    table.dropColumn("license_number");
    table.dropColumn("license_valid");
  });
};
