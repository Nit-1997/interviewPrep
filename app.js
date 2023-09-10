var express = require("express")
    , app = express()
    , cors = require('cors')
    , mongoose = require("mongoose")
    , User = require("./models/user")
    , bodyParser = require("body-parser");

require('dotenv').config();
const path = require("path");

const {dbUser, dbPwd, dbName} = require("./config");

const dbURI = `mongodb+srv://${dbUser}:${dbPwd}`
    + `@cluster0.max4jrk.mongodb.net/?retryWrites=true&w=majority`;

console.log(dbURI);
mongoose.connect(dbURI, {dbName: dbName});
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));

const jwt = require("jsonwebtoken");

//passport stuff
const passport = require("passport");
const jwtStrategry = require("./strategies/jwt")
passport.use(jwtStrategry);

const user = require('./routes/user');
const courses = require('./routes/courses');
const code = require('./routes/code');
const securedRoutes = require('./routes/securedRoutes');

app.use('/', user);
app.use('/', courses);
app.use('/', code);
app.use('/', passport.authenticate('jwt', {session: false}), securedRoutes);


// app.listen(process.env.PORT, process.env.IP, function () {
//     console.log("app server has started on heroku ");
// });

const port = process.env.PORT || 4000

app.listen(process.env.PORT || 4000, function () {
    console.log("app server has started on heroku ");
});

