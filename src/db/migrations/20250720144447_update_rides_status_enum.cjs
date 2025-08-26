/**
 * @param { import("knex") } knex
 * @returns { Promise<void> }
 */
/**
 * @param { import("knex") } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  // Drop the existing constraint (if it exists)
  await knex.raw(
    `ALTER TABLE rides DROP CONSTRAINT IF EXISTS rides_status_check`
  );

  // Add new constraint with the updated enum values
  await knex.raw(`
    ALTER TABLE rides
    ADD CONSTRAINT rides_status_check
    CHECK (status IN ('pending', 'accepted', 'completed', 'cancelled'))
  `);
};

/**
 * @param { import("knex") } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  // Revert to the original constraint
  await knex.raw(
    `ALTER TABLE rides DROP CONSTRAINT IF EXISTS rides_status_check`
  );

  await knex.raw(`
    ALTER TABLE rides
    ADD CONSTRAINT rides_status_check
    CHECK (status IN ('cancelled','pending', 'accepted', 'completed'))
  `);
};
