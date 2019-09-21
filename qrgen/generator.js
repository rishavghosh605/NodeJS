'use strict';
const qr=require('qr-image');
const fs=require('fs');

//node qr "Encode this string" "QRImage.png"

let dataToEncode = process.argv[2] || null;//The second parameter if not given by user set to 0
let outImage = process.argv[3] || null;

    if(dataToEncode!=null && outImage!=null){
        qr.image(dataToEncode,{
            'type':'png',
            'size':20
        }).pipe(fs.createWriteStream(outImage));

        console.log("QR code generated");
    }
    else
    {
        console.log("Command line arguments not given");
    }