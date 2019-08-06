var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json({limit: "50mb"}));


app.get(['/home','/','/landing'],function(req,res){
  res.send('<h1>welcome</h1>');
});




// app.listen(7000,function(){
//      console.log("clinby");
// });

app.listen(process.env.PORT,process.env.IP,function(){
     console.log("app server has started on heroku ");
});

