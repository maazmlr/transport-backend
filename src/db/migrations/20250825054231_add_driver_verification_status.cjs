// migrations/20250820120000_add_driver_verification_status.js
export async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table
      .enu("driver_verification_status", ["pending", "verified", "rejected"], {
        useNative: true,
        enumName: "driver_verification_enum", // for Postgres
      })
      .defaultTo("pending");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("driver_verification_status");
  });

  // For Postgres: cleanup enum type
  await knex.raw("DROP TYPE IF EXISTS driver_verification_enum");
}
