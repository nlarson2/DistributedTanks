const { UserInfo } = require("./playerinfo");

var usrData = new UserInfo();

console.log(usrData.getPlayerID().toString());

console.log(usrData.isPlayer("ten"));

console.log(usrData.getCipher("ten"));

console.log(usrData.getUserData("five"));

console.log(usrData.getAllData());
