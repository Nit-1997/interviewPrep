var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json({limit: "50mb"}));


app.get(['/home','/','/landing'],function(req,res){
  res.send('hello');
});




// app.listen(7000,function(){
//      console.log("clinby");
// });

const port  = process.env.PORT||7000;
app.listen(port,process.env.IP,function(){
     console.log("app server has started on heroku ");
});

