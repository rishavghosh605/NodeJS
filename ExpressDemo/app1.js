const express=require('express');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
//An example configuration which reads the JWT from the http Authorization header with the scheme 'bearer':

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
app=express();



app.set('port',process.env.PORT||3000);//Setting the app.port keyword to the value 3000
//process.env.* : Allows you to access an environment variable on the server instance
//app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');
app.use(express.static('./public'));


app.post('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
        res.send(req.user.profile);
    }
);
//To send an ejs file we use res.render()
app.get("/ejs",(req,res,next)=>{
    res.render("contact");
});


//Implementing passport logic
app.get("/login",(req,res,next)=>{
    res.render("login");
});
//To get the earlier set port variable we use the app.get method
console.log(app.get('port'));
app.listen(app.get('port'),()=>console.log("Express running on port ",app.get('port')));