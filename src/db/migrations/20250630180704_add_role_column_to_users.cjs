exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("role").defaultTo("user"); // default can be "rider", adjust as needed
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("role");
  });
};
