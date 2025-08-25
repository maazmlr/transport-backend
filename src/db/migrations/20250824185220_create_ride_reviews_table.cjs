exports.up = async function (knex) {
  await knex.schema.createTable("ride_reviews", function (table) {
    table.increments("id").primary();
    table.uuid("user_id").notNullable()
      .references("id").inTable("users")
      .onDelete("CASCADE");
    table.uuid("ride_id").notNullable()
      .references("id").inTable("rides")
      .onDelete("CASCADE");
    table.integer("rating").notNullable();
    table.text("comment");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("ride_reviews");
};
