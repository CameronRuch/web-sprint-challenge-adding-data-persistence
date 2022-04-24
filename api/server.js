// build your server here and require it from index.js
const express = require('express');

const server = express();

server.use(express.json());

const resourcesRouter = require('./resource/router');
const projectsRouter = require('./project/router');
const tasksRouter = require('./task/router');


server.use('/api/resources', resourcesRouter);
server.use('/api/projects', projectsRouter);
server.use('/api/tasks', tasksRouter);

server.use('*', (req, res) => {
    res.json({ api: 'up' })
});

server.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: 'something went wrong in router',
        message: err.message,
        stack: err.stack
    });
});

module.exports = server;