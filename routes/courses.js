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


const {c, cpp, node, python, java} = require('compile-run');


function comparer(str1,str2){
    if(str1[str1.length-1] === '\n'){
       str1 = str1.substring(0,str1.length-1);
    }
    str1 = str1.split('\n');
    for(var i=0;i<str1.length;i++){
      if(str1[i][str1[i].length-1] === ' '){
        str1[i] = str1[i].substring(0,str1[i].length-1);
      }
    }
    str1 = str1.join('\n');
    if(str1 === str2){
      return true;
    }else{
      return false;
    }
}

router.post('/compileCode',async function(req,res){
     console.log(req.body);
    let solutions =[];
    switch(req.body.language){
         case 'c' :   for(let i=0;i<2;i++){
                           let tcase = req.body.sampleCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await c.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Passed all test cases";
                                    result.status = 1;
                                  }else{
                                    result.verdict = "Your code failed some of the test cases,try dry running or use the custom input/output to test your code";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        res.json(solutions);
                        break;
         case 'java' : for(let i=0;i<2;i++){
                           let tcase = req.body.sampleCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await java.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Passed all test cases";
                                    result.status = 1;
                                  }else{
                                    result.verdict = "Your code failed some of the test cases,try dry running or use the custom input/output to test your code";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        res.json(solutions);
                        break;
         case 'python' : for(let i=0;i<2;i++){
                           let tcase = req.body.sampleCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await python.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Passed all test cases";
                                    result.status = 1;
                                  }else{
                                    result.verdict = "Your code failed some of the test cases,try dry running or use the custom input/output to test your code";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        res.json(solutions);
                        break;
         case 'c++' : for(let i=0;i<2;i++){
                           let tcase = req.body.sampleCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await cpp.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Passed all test cases";
                                    result.status = 1;
                                  }else{
                                    result.verdict = "Your code failed some of the test cases,try dry running or use the custom input/output to test your code";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        res.json(solutions);
                        break;
         case 'javascript' : for(let i=0;i<2;i++){
                               let tcase = req.body.sampleCases[i];
                               let stdin = tcase.i;
                               let output = tcase.o;
                               await node.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                                  if(err){
                                      console.log(err);
                                      solutions.push(err);
                                  }
                                  else{
                                      if(comparer(result.stdout,output)){
                                        result.verdict = "Passed all test cases";
                                        result.status = 1;
                                      }else{
                                        result.verdict = "Your code failed some of the test cases,try dry running or use the custom input/output to test your code";
                                        result.status = 0;
                                      }
                                      solutions.push(result);
                                    } 
                               });
                            }
                            res.json(solutions);
                            break;
      }
});

module.exports = router;