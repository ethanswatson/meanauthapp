const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
const TaskList = require('./taskList');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    taskList: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
};

module.exports.hasTaskList = function(id, callback) {
    User.findById(id, (err, user) => {
        if (err) throw err;

        // Check if "taskList" exists in user
        if ('taskList' in user) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            taskList.createTaskList((err2, taskList) => {
                if (err2) throw err2;
                newUser.taskList = taskList._id;
                newUser.save(callback);
            })
        });
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
