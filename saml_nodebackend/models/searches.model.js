const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const searchSchema = new Schema( {
    userId: {type: String, required: true},
    keyword: {type: String, required: true},
    result: {
        type: Array,
        "default": {
            type: Number
        }
    }
}, {
    timestamps: true
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;