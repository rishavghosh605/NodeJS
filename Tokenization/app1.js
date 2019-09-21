var express=require('express'),
    path=require('path'),
    config=require('./config/config.js');

var app=express();
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('hogan-express'));
app.set('view-engine','html');

app.use(express.static(path.join(__dirname,'public')));
app.set('port',process.env.PORT || 3000);
//app.host('host',config.host);

require('./routes/routes.js')(express,app);
app.listen(app.get('port'),function(){
    console.log("Login working at port: "+app.get('port'));
});
