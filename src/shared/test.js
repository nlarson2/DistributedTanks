const { Security } = require("./security");

var safe = new Security(007);

safe.initCipher();

var data = "This message is gettting encrypted and then decrypted";


var encryptedData = safe.encrypt(data);

console.log(encryptedData);

var decryptedData = safe.decrypt(encryptedData);

console.log(decryptedData);

var cipher = safe.getCipher();

console.log(cipher);

var allInfo = safe.getInfo();

console.log(allInfo);


