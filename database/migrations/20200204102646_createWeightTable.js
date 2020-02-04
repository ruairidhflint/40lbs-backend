exports.up = function (knex) {
  return knex.schema.createTable('weight', (table) => {
    table.increments();
    table.string('date').notNullable();
    table.float('current_weight')
      .unsigned()
      .notNullable();
    table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('weight');
};
