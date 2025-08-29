exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.increments("id").primary();

    table
      .uuid("ride_id")
      .references("id")
      .inTable("rides")
      .onDelete("CASCADE");

    table
      .uuid("sender_id")
      .references("id")
      .inTable("users") // if drivers are also in "users" table
      .onDelete("CASCADE");

    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
