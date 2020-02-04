exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table.float('current_weight').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
