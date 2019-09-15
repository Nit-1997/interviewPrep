var  express        = require("express")
   , app            = express()
   , cors           = require('cors')
   , mongoose       = require("mongoose")
   , passport       = require("passport")
   , User            = require("./models/user")
   , LocalStrategy  = require("passport-local")
   , bodyParser     = require("body-parser");

const path = require("path");
mongoose.connect('mongodb://nitin:nitin1979@ds159574.mlab.com:59574/prepzone');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));


app.use(require("express-session")({
    secret            : "anything i want i can put here",
    resave            :  false,
    saveUninitialized :  false
    }));

app.use(passport.initialize());
app.use(passport.session());


const user = require('./routes/user');
const courses = require('./routes/courses');
app.use('/', user);
app.use('/', courses);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port  = process.env.PORT||7000;
app.listen(port,process.env.IP,function(){
     console.log("app server has started on heroku ");
});

// app.listen(7000,function(){
//      console.log("app server has started on 7000");
// });

