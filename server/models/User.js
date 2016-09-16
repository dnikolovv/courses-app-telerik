var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required.', unique: true },
    firstName: { type: String, require: '{PATH} is required.' },
    lastName: { type: String, require: '{PATH} is required.' },
    salt: String,
    hashedPassword: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.hashPassword(this.salt, password) === this.hashedPassword) {
            return true;
        }
        else {
            return false;
        }

    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {

    User.find({}).exec(function (err, users) {

        if (err) {
            console.log("Couldn't query users: " + err);
            return;
        }

        if (users.length === 0) {

            var salt;
            var hashedPassword;

            salt = encryption.generateSalt();
            hashedPassword = encryption.hashPassword(salt, 'dnikolovv');
            User.create({username: 'dnikolovv', firstName: 'Dobromir', lastName: 'Nikolov', salt: salt, hashedPassword: hashedPassword, roles: ['admin']});
            salt = encryption.generateSalt();
            hashedPassword = encryption.hashPassword(salt, 'stamatovv');
            User.create({username: 'stamatovv', firstName: 'Stamat', lastName: 'Stamatovv', salt: salt, hashedPassword: hashedPassword, roles: ['standard']});
            salt = encryption.generateSalt();
            hashedPassword = encryption.hashPassword(salt, 'chichoti');
            User.create({username: 'chichoti', firstName: 'Chicho', lastName: 'Ti', salt: salt, hashedPassword: hashedPassword});

            console.log('Added users to database.');
        }
    });
};