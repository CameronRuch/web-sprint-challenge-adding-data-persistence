/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('projects', table => {
            table.increments('project_id').primary()
            table.string('project_name').notNullable()
            table.string('project_description')
            table.integer('project_completed').defaultTo(0)
        })
        .createTable('resources', table => {
            table.increments('resource_id').primary()
            table.string('resource_name').notNullable().unique()
            table.string('resource_description')
        })
        .createTable('tasks', table => {
            table.increments('task_id').primary()
            table.string('task_description').notNullable()
            table.string('task_notes')
            table.integer('task_completed').defaultTo(0)
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')

        })
        .createTable('projects_resources', table => {
            table.integer('project_id')
                .unsigned()
                .notNullable()
                .references('project_id')
                .inTable('projects')
            table.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('resource_id')
                .inTable('resources')
            table.primary(['project_id', 'resource_id'])
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema
        .dropTableIfExists('projects_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
