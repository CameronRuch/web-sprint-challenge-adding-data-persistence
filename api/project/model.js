// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('projects')
}

const getById = (id) => {
    return db('projects')
        .where('id', id)
        .first()
}

async function create(project) {
    const [id] = await db('projects').insert(project)
    return getById(id)
} 

module.exports = {
    getAll,
    getById,
    create
}