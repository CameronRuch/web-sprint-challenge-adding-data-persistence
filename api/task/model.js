// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('tasks as t')
        .leftJoin('projects as p', 'p.project_id', 't.project_id')
        .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
        .then(tasks => tasks.map(task => transformData(task)))

}

const getById = (id) => {
    return db('tasks')
        .where('id', id)
        .first()
}

const transformData = (task) => {
    task.task_completed = task.task_completed ? true : false
    console.log(task)
    return task
}

async function create(task) {
    const [id] = await db('tasks').insert(task)
    return db('tasks').where('task_id', id).first().then(transformData)
}

module.exports = {
    getAll,
    getById,
    create
}