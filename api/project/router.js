// build your `/api/projects` router here
const router = require('express').Router()

const Project = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.getAll()
        res.json(projects)
        next()
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const project = await Project.create(req.body)
        res.json(project)
        next()
    } catch (err) {
        next(err)

    }
})

module.exports = router;