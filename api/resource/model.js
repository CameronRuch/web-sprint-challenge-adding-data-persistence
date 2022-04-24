// build your `Resource` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

const getById = (id) => {
    return db('resources')
        .where('id', id)
        .first()
}

async function create(resource) {
    const [id] = await db('resources').insert(resource)
    return getById(id)
} 

module.exports = {
    getAll,
    getById,
    create
}