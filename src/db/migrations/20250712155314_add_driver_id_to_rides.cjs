exports.up = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.uuid("driver_id").nullable(); // foreign key to users.id (if you want, you can also add FK constraint)
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("rides", (table) => {
    table.dropColumn("driver_id");
  });
};
