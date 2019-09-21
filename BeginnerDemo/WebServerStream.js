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

function fileAccess(filepath)
{
    return new Promise((resolve,reject)=>{
        fs.access(filepath,fs.F_OK,error=>{
            if(!error)
            {
                resolve(filepath);
            }else{
                reject(error);
            }
        });
    });
}

/*function fileReader(filepath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,(error,content)=>{
            if(!error){
                resolve(content);
            }
            else{
                reject(error);
            }
        });
    });
}*/
function streamFile(filepath){
     return new Promise((resolve,reject)=>{
       //Streams are event-emitters
       let fileStream=fs.createReadStream(filepath);
       //Now we lsten fir the open event
       fileStream.on('open',()=>{
            resolve(fileStream);
       });
       fileStream.on('error',()=>{
           reject(error);
       });
     });
}
function webserver(req,res)
    {
        //if the route requested is '/', then load 'index.htm'or else load the requested file(s)
        let baseURI=url.parse(req.url);

        let filepath=__dirname+(baseURI.pathname === '/' ? '/index.htm' : baseURI.pathname);
        let contentType=mimes[path.extname(filepath)];
        fileAccess(filepath)
            .then(streamFile)
            .then(fileStream=>{
                res.writeHead(200,{'Content-type':contentType});
                //res.end(content,'utf-8');
                //We pipe out the fileStream into the res object
                fileStream.pipe(res);
            })
            .catch(error=>{
                res.writeHead(404);
                res.end("Content not found: "+JSON.stringify(error));
            });



    }
http.createServer(webserver).listen(5000,()=>
    console.log("Webserver running on port:5000")
);