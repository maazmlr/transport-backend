// 20250817133000_recreate_tickets.cjs
exports.up = function (knex) {
  return knex.schema
    .dropTableIfExists("ticket_messages")
    .dropTableIfExists("tickets")
    .then(() => {
      return knex.schema.createTable("tickets", (table) => {
        table.increments("id").primary();
        table.string("ticket_number").notNullable().unique();
        table.string("title").notNullable();
        table.text("description").notNullable();
        table.string("status").defaultTo("open");   // open | pending | closed
        table.string("priority").defaultTo("medium"); // low | medium | high
        table.timestamps(true, true); // created_at & updated_at
      });
    })
    .then(() => {
      return knex.schema.createTable("ticket_messages", (table) => {
        table.increments("id").primary();
        table
          .integer("ticket_id")
          .unsigned()
          .references("id")
          .inTable("tickets")
          .onDelete("CASCADE");
        table.string("sender_type").notNullable(); // "customer" | "agent"
        table.text("message").notNullable();
        table.timestamps(true, true);
      });
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("ticket_messages")
    .dropTableIfExists("tickets");
};
