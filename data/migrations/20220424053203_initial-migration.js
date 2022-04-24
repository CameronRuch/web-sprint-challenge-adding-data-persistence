/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema
        .createTable('projects', table => {
            table.increments('project_id')
            table.string('project_name').notNullable()
            table.text('project_description')
            table.boolean('project_completed')
        })
        .createTable('resources', table => {
            table.increments('resource_id')
            table.text('resource_name').notNullable().unique()
            table.text('resource_description')
        })
        .createTable('tasks', table => {
            table.increments('tasks_id')
            table.text('task_description').notNullable()
            table.text('task_notes')
            table.boolean('task_completed')  
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema 
        .dropTableIfExists('projects')
        .dropTableIfExists('resources')
        .dropTableIfExists('tasks')
};
