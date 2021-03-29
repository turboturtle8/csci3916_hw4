/**********************************************************************************************************
 * Movie db
 * *******************************************************************************************************/
var mongoose = require('mongoose');
var MovieSchema = new Schema({
    reviewerName: {type: String, required: true},
    comments: {type: String},
    rating: {type: Number}
});
var module = require('exports');
module.exports = mongoose.model('Movies', MovieSchema);
