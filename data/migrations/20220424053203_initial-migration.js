/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('projects', table => {
            table.increments('project_id').notNullable()
            table.string('project_name').notNullable()
            table.text('project_description').notNullable()
            table.boolean('project_completed').defaultTo(0)
        })
        .createTable('resources', table => {
            table.increments('resource_id').notNullable()
            table.text('resource_name').notNullable().unique()
            table.text('resource_description')
        })
        .createTable('tasks', table => {
            table.increments('task_id').notNullable()
            table.text('task_description').notNullable()
            table.text('task_notes').notNullable()
            table.boolean('task_completed').defaultTo(0)
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')

        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
