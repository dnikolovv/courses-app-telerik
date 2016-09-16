var crypto = require('crypto');

module.exports = {

    generateSalt: function generateSalt() {
        return crypto.randomBytes(128).toString('base64');
    },

    hashPassword: function (salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }
}