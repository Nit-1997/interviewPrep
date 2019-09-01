const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const User = require('../models/user');

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dskmn0vwa', 
  api_key:"943622486141547", 
  api_secret:"klX-ayutXqmxdZUmtL9bXhTQbro"
});

router.post('/createCourse',upload.single('image'),function(req,res){
     console.log(req.body);
      var course = {
     	title:req.body.title,
        image:req.body.image,
        details:req.body.details
      };
        
         cloudinary.uploader.upload(req.file.path, function(result) {
                                // add cloudinary url for the image to the campground object under image property
                              image = result.secure_url; 
                              course.image = image;
                           Course.create(course, function(err, newlyCreated) {
                                  if (err) {
                                    res.json(err)
                                  }else{
                                      console.log(newlyCreated);
                                     res.json(newlyCreated)
                                  }
                                });
                              });                    
                         
});


router.get('/getCourses',function(req,res){
   Course.find({},function(err,allCourses){
            if(err){
                console.log(err);
            } 
            else{
              res.json(allCourses);         
            }
    });
});

router.post('/addLinks',function(req,res){
   var id = req.body.course._id;
   var link = {
       title:req.body.title,
       link:req.body.link,
       types:req.body.type
   }
   Course.findOneAndUpdate(
    { _id: id }, 
    { $push: { links: link} } ,
    function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
            res.json(success);
        }
    });
});

router.post('/addComment',function(req,res){
 var id = req.body.course._id;
 User.find({username:req.body.username},function(err,user){
  if(err){
    console.log(err);
  } 
  else{
  console.log(user);
   var comment = {
     content:req.body.content,
     username:req.body.username,
     name:user[0].name,
     avatar: user[0].image,
     rating:req.body.rating
   }
   Course.findOneAndUpdate(
    { _id: id }, 
    { $push: { comments: comment} } ,
    function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        res.json(success);
      }
    });      
 }
});
});

router.post('/getComments',function(req,res){
  var id = req.body.course._id;
  Course.find({_id:id},function(err,course){
      let comments = [];
      comments = course[0].comments;  
      console.log(comments);
      res.json(comments);     
  });
});

var hackerEarth=require('hackerearth-node'); //require the Library
//Now set your application 
var hackerEarth=new hackerEarth(
                                '623b26940fafc130ac89e207dab7fb6545e054ee',  //Your Client Secret Key here this is mandatory
                                0  //mode sync=1 or async(optional)=0 or null async is by default and preferred for nodeJS
);


router.post('/compileCode',function(req,res){
  console.log(req.body.code);
  var config={};
      config.time_limit=1;  //your time limit in integer
      config.memory_limit=323244;  //your memory limit in integer
      config.source=req.body.code;  //your source code for which you want to use hackerEarth api
      config.input="";  //input against which you have to test your source code
      config.language="C++"; //optional choose any one of them or none
      //compile your code 
      hackerEarth.compile(config,function(err,res){
        if(err) {
         console.log(err);
      } else {
        console.log(res);
      }
    });
});

module.exports = router;