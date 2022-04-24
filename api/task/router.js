// build your `/api/tasks` router here
const router = require('express').Router()

const Task = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.getAll()
        res.json(tasks)
        next()
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = await Task.create(req.body)
        res.json(task)
        next()
    } catch (err) {
        next(err)

    }
})

module.exports = router;