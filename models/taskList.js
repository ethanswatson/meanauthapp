const mongoose = require('mongoose');
const config = require('../config/database');

const TaskListSchema = mongoose.Schema({
    tasks: [{
        task: {
            type: String,
            required: true
        },
        isCompleted: {
            type: Boolean,
            required: true
        }
    }]
});

const TaskList = mongoose.model('Tasks', TaskListSchema);

module.exports = TaskList;

// module.exports.addTask = function(id, newTask, callback) {
//     newTask.save(callback);
// }

module.exports.getTasks = function(id, callback) {
    TaskList.findById(id, callback);
}

module.exports.createTaskList = function(callback) {
    let newTaskList = new TaskList({tasks: []});
    newTaskList.save(callback);
}

module.exports.addTask = function(id, callback) {
    TaskList.findById(id, (err, taskList) => {
        if (err) throw err;

        //Unfinished
    });
}