exports.up = async function (knex) {
  await knex.schema.table("rides", function (table) {
    table.time("time");
  });
};

exports.down = async function (knex) {
  await knex.schema.table("rides", function (table) {
    table.dropColumn("time");
  });
};
