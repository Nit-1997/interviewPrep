var  express        = require("express")
   , app            = express()
   , cors           = require('cors')
   , mongoose       = require("mongoose")
   , User           = require("./models/user")
   , bodyParser     = require("body-parser");

const path = require("path");
mongoose.connect('mongodb+srv://ntnbhat9:Nit@1979@cluster0.max4jrk.mongodb.net/?retryWrites=true&w=majority');
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));

const jwt = require("jsonwebtoken");

//passport stuff
const passport = require("passport");
const jwtStrategry  = require("./strategies/jwt")
passport.use(jwtStrategry);

const user = require('./routes/user');
const courses = require('./routes/courses');
const code = require('./routes/code');
const securedRoutes = require('./routes/securedRoutes');

app.use('/', user);
app.use('/', courses);
app.use('/',code);
app.use('/', passport.authenticate('jwt', {session: false}), securedRoutes);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// const port  = process.env.PORT||7000;
// app.listen(port,process.env.IP,function(){
//      console.log("app server has started on heroku ");
// });

app.listen(7000,function(){
     console.log("app server has started on 7000");
});

