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
    if(str2[str2.length-1] === '\n'){
       str2 = str2.substring(0,str2.length-1);
    }
    str2 = str2.split('\n');
    for(var i=0;i<str2.length;i++){
      if(str2[i][str2[i].length-1] === ' '){
        str2[i] = str2[i].substring(0,str2[i].length-1);
      }
    }
    str2 = str2.join('\n');
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
                                  err.verdict = "Error";
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
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
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
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
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
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
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
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
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
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

router.post('/compileCodeCustom',async function(req,res){
    let solutions = [];
    let stdin;
    let output;
    switch(req.body.language){
         case 'c' :        stdin = req.body.customCase;
                           output = '';
                            await c.runSource(req.body.correctCode.c,{stdin:stdin,compileTimeout:3000},async(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }else{
                                 output = await result.stdout;
                              }
                             });
                            await c.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                    console.log(result);
                                    solutions.push(result);
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                    console.log(result);
                                    solutions.push(result);
                                  }
                                  res.json(solutions);
                                } 
                           });
                           break;
         case 'java' :  stdin = req.body.customCase;
                           output = '';
                            await java.runSource(req.body.correctCode.java,{stdin:stdin,compileTimeout:3000},async(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }else{
                                 output = await result.stdout;
                              }
                             });
                            await java.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                    console.log(result);
                                    solutions.push(result);
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                    console.log(result);
                                    solutions.push(result);
                                  }
                                  res.json(solutions);
                                } 
                           });
                           break;
         case 'python' : stdin = req.body.customCase;
                            output = '';
                            await python.runSource(req.body.correctCode.python,{stdin:stdin,compileTimeout:3000},async(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }else{
                                 output = await result.stdout;
                              }
                             });
                            await python.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                    console.log(result);
                                    solutions.push(result);
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                    console.log(result);
                                    solutions.push(result);
                                  }
                                  res.json(solutions);
                                } 
                           });
                           break;
         case 'c++' :       stdin = req.body.customCase;
                           output = '';
                            await cpp.runSource(req.body.correctCode.cpp,{stdin:stdin,compileTimeout:3000},async(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }else{
                                 output = await result.stdout;
                              }
                             });
                            await cpp.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                    console.log(result);
                                    solutions.push(result);
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                    console.log(result);
                                    solutions.push(result);
                                  }
                                  res.json(solutions);
                                } 
                           });
                           break;
         case 'javascript' : stdin = req.body.customCase;
                            output = '';
                            await node.runSource(req.body.correctCode.node,{stdin:stdin,compileTimeout:3000},async(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }else{
                                 output = await result.stdout;
                                 console.log(output);
                              }
                             });
                            await node.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  res.json(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                    console.log(result);
                                    solutions.push(result);
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                    console.log(result);
                                    solutions.push(result);
                                  }
                                  res.json(solutions);
                                } 
                           });
                           break;
      }
});

router.post('/submitCode',async function(req,res){
    console.log(req.body);
    let responseObj = {
        score:0,
        solutions:[]
    }
    let solutions =[];
    let score = 0;
    switch(req.body.language){
         case 'c' :   for(let i=0;i<6;i++){
                           let tcase = req.body.testCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await c.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    score = score+16.66;
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        score = Math.ceil(score);
                        responseObj.score = score;
                        responseObj.testCases = solutions;
                        res.json(responseObj);
                        break;
         case 'java' : for(let i=0;i<6;i++){
                           let tcase = req.body.testCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await java.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    score = score+16.66;
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        score = Math.ceil(score);
                        responseObj.score = score;
                        responseObj.testCases = solutions;
                        res.json(responseObj);
                        break;
         case 'python' : for(let i=0;i<6;i++){
                           let tcase = req.body.testCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await python.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    score = score+16.66;
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        score = Math.ceil(score);
                        responseObj.score = score;
                        responseObj.testCases = solutions;
                        res.json(responseObj);
                        break;
         case 'c++' : for(let i=0;i<6;i++){
                           let tcase = req.body.testCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await cpp.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    score = score+16.66;
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        score = Math.ceil(score);
                        responseObj.score = score;
                        responseObj.testCases = solutions;
                        res.json(responseObj);
                        break;
         case 'javascript' : for(let i=0;i<6;i++){
                           let tcase = req.body.testCases[i];
                           let stdin = tcase.i;
                           let output = tcase.o;
                           await node.runSource(req.body.code,{stdin:stdin,compileTimeout:3000},(err, result) => {
                              if(err){
                                  console.log(err);
                                  solutions.push(err);
                              }
                              else{
                                  if(comparer(result.stdout,output)){
                                    score = score+16.66;
                                    result.verdict = "Accepted";
                                    result.status = 1;
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color = "#21d13c";
                                  }else{
                                    result.verdict = "Wrong Answer";
                                    result.i = stdin;
                                    result.eo = output;
                                    result.color="#F14B65";
                                    result.status = 0;
                                  }
                                  solutions.push(result);
                                } 
                           });
                        }
                        score = Math.ceil(score);
                        responseObj.score = score;
                        responseObj.testCases = solutions;
                        res.json(responseObj);
                        break;
      }
});

module.exports = router;