'use strict';

const http=require('http');
const url=require('url');
const fs=require('fs');
//To resolve the mime types
const path=require('path');
let mimes={
    '.htm':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.jpeg':'image/jpeg',
    '.gif':'image/gif',
    '.jpg':'image/jpg'
}

function webserver(req,res)
    {
        //if the route requested is '/', then load 'index.htm'or else load the requested file(s)
        let baseURI=url.parse(req.url);
        console.log(baseURI.pathname);
        let filepath=__dirname+(baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
        if (baseURI==="/favicon.ico"){
            console.log("ghjgj",baseURI);
        }
        //Check if the file is accessible or not
        if(filepath!==undefined)
        {

            fs.access(filepath,fs.F_OK ,error=>{
                if(!error)
                {
                    //Read the file from memory and serve it
                    fs.readFile(filepath,(error,content)=>{
                        if(!error)
                        {
                            //Resolve the content type
                            let contentType=mimes[path.extname(filepath)];
                            //Serve the file from buffer
                            res.writeHead(200,{'Content-Type':contentType});
                            res.end(content,'utf-8');
                        }
                        else
                        {
                            //Serve a 500
                            res.writeHead(500);
                            res.end("The server could not read the file requested");
                        }
                    });
                }
                else{//Must give an else condition before these response statements
                    // or else they will get executed synchronously before the other asynchronous callbacks
                    //We throw an error status code
                    res.writeHead(404);
                    res.end('Content not found!');
                }

            });
        }
        else{
            res.writeHead(400);
            res.end("Content not found");}

    }
http.createServer(webserver).listen(3000,()=>{
    console.log("Webserver running on port:3000");
});