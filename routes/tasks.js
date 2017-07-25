const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const TaskList = require('../models/taskList');

// Load tasks
router.get('/', passport.authenticate('jwt', { session: false }),  loadTasks)

module.exports = router;

function loadTasks(req, res, next) {
    TaskList.getTasks(req.id, (err, taskList) => {
        if (err) throw err;

        res.json({tasks: taskList.tasks});
    });
}