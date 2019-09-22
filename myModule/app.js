"use strict";

const Securer= require('./AESecure');
const secure=new Securer("magrathea");
let encodeString=secure.encode("Don't Panic");
console.log("Encoded: ",encodeString);
let decodeString=secure.decode(encodeString);
console.log("Decoded: ",decodeString);
let qr=secure.qrgen(encodeString,"QR.png");
qr ? console.log("QR code was generated") : console.log("QR code was not generated");