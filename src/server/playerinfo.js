
const express = require('express');
/*
const cookieParser = require('cookie-parser');
const cokis = express();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
*/
/*
const app = express();
const expressip = require('express-ip');
const PORT = proces.env.PORT || 44444;
const path = require('path');
*/

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csWriter = createCsvWriter({ path: 'users.csv' });

const fs = require('fs');

const users = [];

class UserInfo {

	constructor() {

	}

	getPlayerID(req) {
		var ipAddress;

		// The request may be forwarded from local web server.
		var forwardedIpsStr = req.header('x-forwarded-for'); 

		if (forwardedIpsStr) {
			// 'x-forwarded-for' header may return multiple IP addresses in
			// the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
			// the first one
			var forwardedIps = forwardedIpsStr.split(',');

			ipAddress = forwardedIps[0];

		}
		if (!ipAddress) {
			// If request was not forwarded
			ipAddress = req.connection.remoteAddress;
		}
		return ipAddress;

	} 

	isPlayer(username) {
		var valid = false;
		var data = fs.readFileSync('users.csv')
			.toString()
			.split("\n")
			.map(e => e.trim())
			.map(e => e.split(",")
				.map(e => e.trim()));
		//console.log(data);
		data.forEach(element => { 
			if(element[0] == username) { 
				valid = true;
			}
		});
		return valid;

	}

	addCipher(username, key, iv) {
		var data = fs.readFileSync('users.csv')
			.toString()
			.split("\n")
			.map(e => e.trim())
			.map(e => e.split(",")
				.map(e => e.trim()));
		console.log(data);
		data.forEach(element => { 
			if(element[0] == username) {
				element[3] = key; //.toString('hex') maybe
				element[4] = iv; //.toString('hex') maybe
			} 
		});

		csvWriter.writeRecords(data);

	}

	getCipher(username) {
		var cipher;
		var data = fs.readFileSync('users.csv')
			.toString()
			.split("\n")
			.map(e => e.trim())
			.map(e => e.split(",")
				.map(e => e.trim()));
		data.forEach(element => { 
			if(element[0] == username) {
				cipher = { key: element[3].toString(), iv: element[4].toString() };
			}
		});
		return cipher;

	}

	getUserData(username) {
		var userData;
		var data = fs.readFileSync('users.csv')
			.toString()
			.split("\n")
			.map(e => e.trim())
			.map(e => e.split(",")
				.map(e => e.trim()));
		data.forEach(element => { 
			if(element[0] == username) 
				userData = element;
		});

		return userData;
	}

	getAllData() {
		var data = fs.readFileSync('users.csv')
			.toString()
			.split("\n")
			.map(e => e.trim())
			.map(e => e.split(",")
				.map(e => e.trim()));
		return data;

	}

}

exports.UserInfo = UserInfo;
