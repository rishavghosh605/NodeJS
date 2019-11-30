const express=require('express');
const dashboard=require('./app');
app=express();

/*One of the greatest things about express is that it comes with something called Middleware
that hooks into the req and response process streams to process or preprocess data
We can write a middleware function for one or more routes*/
/*let helloMiddleware = (req,res,next)=>{
    req.hello="Hi, I have created a middleware function";
    next();//We use the next keyword to move control to the next middleware function
};*/
/*A Middleware is like a plugin so you need to plugi it somewhere in the code to make it work
To use the middleware function we use the function app.use()*/
//Here I am plugging in the middleware function into the req and res streams before the routes come to effect
/*The position of the app.use method decides which routes can use it or not
Routes above app.use cannot
but below the app.use function can;
We can also bind the app.use keyword to specific routes like this
app.use('/dashboard',helloMiddleware)*/

/*Express comes with its own set of nae value pairs but the interesting thing is that you can create your
name value pairs*/
app.set('port',process.env.PORT||3000);//Setting the app.port keyword to the value 3000
//process.env.* : Allows you to access an environment variable on the server instance
app.use(express.static('public'));
app.set('view engine','ejs');
app.use("/",dashboard.router);
/*app.get('/',(req,res,next)=>{
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
        console.log(req.hello);
        /*res.send(22);// After using res.send once you cannot use it again as the client server connection has been terminted and
        // you get the error: Cannot set headers after they are sent to the client
    }
);
*/
/*
app.get('/checkMiddleware',(req,res,next)=>{
    res.send('<h1>'+req.hello+'. Yes we have got the Middleware working!</h1>');
});

//To send a static HTML file we use res.sendFile()
app.get("/html",(req,res,next)=>{
    res.sendFile(__dirname+"/views/contact.htm");
});

//To send an ejs file we use res.render()
app.get("/ejs",(req,res,next)=>{
    res.render("index");
});*/
//To get the earlier set port variable we use the app.get method
console.log(app.get('port'));
app.listen(app.get('port'),()=>console.log("Express running on port ",app.get('port')));