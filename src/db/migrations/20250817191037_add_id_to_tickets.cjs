// 20250817195000_add_user_id_to_tickets_fix.cjs

export async function up(knex) {
  return knex.schema.alterTable("tickets", function (table) {
    table
      .integer("user_id")
      .unsigned()
      .references("userId")
      .inTable("users")
      .onDelete("CASCADE")
      .index();
  });
}

export async function down(knex) {
  return knex.schema.alterTable("tickets", function (table) {
    table.dropColumn("user_id");
  });
}
