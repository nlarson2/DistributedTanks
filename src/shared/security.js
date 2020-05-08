const algorithm = 'aes-256-cbc';
const crypto = require('crypto');

class Security {
	
	constructor(userID) { 
		//saves new temp key and iv to user at login success
		this.id = userID;
	}

	initCipher() {
		this.key = crypto.randomBytes(32);
		this.iv = crypto.randomBytes(16);
	}
	
	setCipher(key, iv) {
		this.key = Buffer.from(key, 'hex');
		this.iv = Buffer.from(iv, 'hex');
	}

	encrypt(text) {
		let cipher = crypto.createCipheriv(algorithm, Buffer.from(this.key), this.iv);
		let encrypted = cipher.update(text);
		encrypted = Buffer.concat([encrypted, cipher.final()]);
		return encrypted.toString('hex');
	}

	decrypt(text) {
		let encryptedText = Buffer.from(text, 'hex');
		let decipher = crypto.createDecipheriv(algorithm, Buffer.from(this.key), this.iv);
		let decrypted = decipher.update(encryptedText);
		decrypted = Buffer.concat([decrypted, decipher.final()]);
		return decrypted.toString();
	}

	getCipher() {
		return { key: this.key.toString('hex'), iv: this.iv.toString('hex') };
	}

	getInfo() {
		return { id: this.id.toString(), key: this.key.toString('hex'), iv: this.iv.toString('hex') };
	}

}

exports.Security = Security;
