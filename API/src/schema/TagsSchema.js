const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagsSchema = new Schema({
    tag_id: {
        type: String,
        unique: true
    },
    tag_name: String

});

const requestdb = mongoose.model('tags', TagsSchema);

module.exports.TagsSchema = requestdb;