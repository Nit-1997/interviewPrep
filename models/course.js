var mongoose    = require("mongoose");
var CourseSchema = new mongoose.Schema({
     title        : String,
     image        : String,
     details      : String,
     links        : [{ link: 'string' }],
     createdAt    : { type: Date, default: Date.now }      
});

module.exports = mongoose.model("Course",CourseSchema);