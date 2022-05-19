const crypto = require('crypto');

const algo = 'aes256'
const key = 'password'

const encrypt = (password)=>{
    const cipher = crypto.createCipher(algo, key);
    const encrypted = cipher.update(password,'utf8','hex') + cipher.final('hex');
    return encrypted;

}

const decrypt = (password)=>{
    const decipher = crypto.createDecipher(algo, key);
    const decrypted = decipher.update(password,'hex','utf8') + decipher.final('utf8')
    return decrypted;

}

module.exports = {
    encrypt,decrypt
}