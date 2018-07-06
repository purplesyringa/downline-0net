/*
var crypto = require("crypto");
var eccrypto = require("eccrypto");
 
var privateKeyA = crypto.randomBytes(32);
var publicKeyA = eccrypto.getPublic(privateKeyA);
var privateKeyB = crypto.randomBytes(32);
var publicKeyB = eccrypto.getPublic(privateKeyB);
 
// Encrypting the message for B.
eccrypto.encrypt(publicKeyB, Buffer("msg to b")).then(function(encrypted) {
  // B decrypting the message.
  eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
    console.log("Message to part B:", plaintext.toString());
  });
});
 
// Encrypting the message for A.
eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
  // A decrypting the message.
  eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
    console.log("Message to part A:", plaintext.toString());
  });
});
*/