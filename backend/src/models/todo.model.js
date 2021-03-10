const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean,
    userId: String
}, {
    timestamps: true
});

const TodoModel = mongoose.model('todo', TodoSchema);

module.exports = TodoModel;