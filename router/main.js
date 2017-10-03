module.exports = function(app)
{
	
	
     app.get('/',function(req,res){
        res.render('navigationV.html')
     });
     app.get('/index',function(req,res){
        res.render('index.html');
    });

     

}
