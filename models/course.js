var mongoose    = require("mongoose");
var CourseSchema = new mongoose.Schema({
     title        : String,
     image        : String,
     details      : String,
     links        : [{ link: String,
                       title: String,
                       types: String
                     }],
     comments        : [{ name: String,
                          content: String,
                          username: String,
                          rating: String,
                          avatar: String
                       }],
     createdAt    : { type: Date, default: Date.now }      
});

module.exports = mongoose.model("Course",CourseSchema);