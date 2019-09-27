var mongoose    = require("mongoose");
var CodeSchema = new mongoose.Schema({
     title        : String,
     description  : String,
     inputFormat  : String,
     constraints  : String,
     outputFormat : String,
     difficulty   : String,
     color        : String,
     tags         :[{ tag: String}],
     sampleExample : [{ i: String,
                       o: String,
                       explain:String
                     }],
     testCases    : [{ i: String,
                       o: String
                     }],
     sampleCases  : [{ i: String,
                       o: String
                     }],
     correctCode  : [{ cpp: String,
                       java: String,
                       python: String,
                       node: String,
                       c: String
                     }],
     createdAt    : { type: Date, default: Date.now }      
});

module.exports = mongoose.model("Code",CodeSchema);