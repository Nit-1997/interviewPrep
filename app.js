var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser");

const path = require("path");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


const port  = process.env.PORT||7000;
app.listen(port,process.env.IP,function(){
     console.log("app server has started on heroku ");
});

