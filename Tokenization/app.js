const express=require('express');
const jwt=require('jsonwebtoken');
const d="";
// We initialize our app variable with express
const app=express();

// We create this route to do some debugging
app.get('/api',(req,res)=>{
    res.send({
        message: 'Welcome to the api'
    });
});

// We create a route that we want to protect that is use secure JWT on
app.post('/api/posts',verifyToken,(req,res) => {

    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            res.send({
                message:"Post Created...",
                authData
            });
        }
  });
});

// Now we create a login route where we get the JWT
// We include a middleware function called verifyToken
app.post('/api/login',(req,res)=>{
    // We create a mock user, basically the user details weget after doing some kind of database or passport.js authentication
    const user = {
        id: 1,
        username : 'brad',
        email : 'brad@gmail.com'
    }

    // Here below we generate a JWT
    // We are using the asynchronous version here
    // In ES6 we can just write user or token and the javascript automatically cretes a json object like user:user or token:token respectively

    jwt.sign({user},'secretkey',(err,token)=>{
        console.log(token);
        jwt.verify(token,'secretkey',(err,authData)=>{
            if(err){
                res.sendStatus(403);
            }
            else{
                res.send({
                    message:"Post Created...",
                    authData
                });
            }
      });
        res.json({
            token

        });
    });

});

/*The format of Token:
Authorization: Bearer <access-token>
*/
// We create the middleware function: verifyToken, we add next
function verifyToken(req,res,next){

    // We get the the auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined:
    if (typeof bearerHeader !== 'undefined'){
        //Split at the token
        const bearer=bearerHeader.split(' ');
        //Get token from array
        const bearerToken=bearer[1];
        req.token=bearerToken
        next();
    }else{
        //Forbidden
        //The sendStatus is used to send a status code
        res.sendStatus(403);
    }
}
app.set('port',3000);
app.listen(app.get('port'),()=>{
    console.log("Server is started at "+app.get('port'));
});

