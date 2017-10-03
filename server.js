var express    =    require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var app        =    express();
var url = 'mongodb://localhost:27017/database1';
var assert = require('assert');
var Promise = require('promise'); 


app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static('scripts'));
app.use(express.static('styles'));
app.use(express.static('videos'));
app.use(express.static('node_modules/animate.css'));

//embed html dynamically
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
var server = app.listen(3000,function(){
	    console.log("We have started our server on port 3000");
	});

app.get('/',function(req,res){
    new Promise(
      function(resolve) {
        findComments(
            function(arr) {
              resolve(arr);
            }
          );
      }
    ).then(
      function(arr) {
        res.render('navigationV.ejs', {comments: arr});   
      }
    );
});





var findComments = function(fn) {
    MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);

      var col = db.collection('comments');
      var cursor = col.find( );
      
      var temp = new Promise(
        function(resolve) {
          resolve(cursor.toArray());
        }
      ).then(
        function(arr) {
          fn(arr);
          db.close();
        }
      );
    });
};


app.post('/comments', (req, res) => {
  	new Promise(function(resolve) {
      MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      var col = db.collection('comments');
      console.log(req.body);
      col.insertOne( {
      "name" : req.body.first_name,
      "text" : req.body.comment
       }, function(err, result) {
        if(err) return console.log(err);
        db.close();
        resolve();
      });
  })}).then(function() {
      new Promise(
        function(resolve) {
          findComments(
              function(arr) {
                resolve(arr);
              }
            );
        }
      ).then(
        function(arr) {
          new Promise(
              function(resolve) {
                resolve(res.render('navigationV.ejs', {comments: arr}));
              }
          ).then(
              function(){
                res.redirect('http://localhost:3000/#4thpage');
          });
          
                       
        }
      );
  });
});
	

