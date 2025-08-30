exports.up = function (knex) {
  return knex.schema.createTable("messages", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); // UUID primary key

    table
      .uuid("ride_id")
      .references("id")
      .inTable("rides")
      .onDelete("CASCADE");

    table
      .uuid("sender_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("messages");
};
