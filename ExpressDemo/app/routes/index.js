
const h=require('../helper');

let routes={
    'get':{
        '/':(req,res,next)=>{
            res.render('mobileapps');
        }
        ,
        '/contact':(req,res,next)=>{
            res.render('contact');
        }
 },
    'post':{

    },
    'NA':(req,res,next)=>{
        res.status(404).sendFile(process.cwd()+"/views/404.htm");
    }
}


module.exports=()=>{

    router=h(routes);
    return router;
}