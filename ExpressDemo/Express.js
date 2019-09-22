const express=require('express');
app=express();
//Express comes with its own set of nae value pairs but the interesting thing is that you can create your
//name value pairs
app.set('port',process.env.PORT||3000);//Setting the app.port keyword to the value 3000
//process.env.* : Allows you to access an environment variable on the server instance
app.get('/',(req,res,next)=>{
    req.greeting="Rishav";
    next();
    },
    (req,res,next)=>{
        //The next keyword allows you to create multiple handler functions for the same route
        //It is used in places where you need to preprocess data do stuff like authentcation
        //The let keyword lets you store variables but the const keyword is like a final keyword in most languages
        let v='Hello '+req.greeting;
        v='<h1>'+v+'</h1>';
        res.send(v);
    }
);
//To get the earlier set port variable we use the app.get method
console.log(app.get('port'));
app.listen(app.get('port'),()=>console.log("Express running on port ",app.get('port')));