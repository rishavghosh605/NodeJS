const router=require('express').Router();

let registeredRoutes=(routes,method)=>{
    for(let key in routes){
        if(typeof routes[key]==='object' && routes[key]!==null && !(routes[key] instanceof Array)){
            registeredRoutes(routes[key],key);
        }
        else{
            if(method==="get"){
                router.get(key,routes[key]);
            }
            else if(method==="post")
            {
                router.post(key,routes[key]);
            }
            else{
                router.use(routes[key]);
            }
        }
    }

}

module.exports=(routes)=>{

    registeredRoutes(routes);
    return router;
}