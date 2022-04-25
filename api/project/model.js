// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('projects')
    .then(projects => projects.map(project => transformData(project)))
}

const getById = (id) => {
    return db('projects')
        .where('id', id)
        .first()
}

const transformData = (project) => {
    project.project_completed = project.project_completed ? true : false
    return project
}

async function create(project) {
    const [id] = await db('projects').insert(project)
    return db('projects').where('project_id', id).first().then(transformData)
} 

module.exports = {
    getAll,
    getById,
    create
}