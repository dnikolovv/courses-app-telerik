var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.on('open', function (err) {
        if (err) {
            console.log(err);
            return;
        }

        console.log('Database running smoothly')
    });

    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String,
        salt: String,
        hashedPassword: String,
        roles: [String]
    });

    userSchema.method({
        authenticate: function(password) {
            if (hashPassword(this.salt, password) === this.hashedPassword) {
                return true;
            }
            else {
                return false;
            }

        }
    })

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, users) {

        if (err) {
            console.log("Couldn't query users: " + err);
            return;
        }

        if (users.length === 0) {

            var salt;
            var hashedPassword;

            salt = generateSalt();
            hashedPassword = hashPassword(salt, 'dnikolovv');
            User.create({username: 'dnikolovv', firstName: 'Dobromir', lastName: 'Nikolov', salt: salt, hashedPassword: hashedPassword, roles: ['admin']});
            salt = generateSalt();
            hashedPassword = hashPassword(salt, 'stamatovv');
            User.create({username: 'stamatovv', firstName: 'Stamat', lastName: 'Stamatovv', salt: salt, hashedPassword: hashedPassword, roles: ['standard']});
            salt = generateSalt();
            hashedPassword = hashPassword(salt, 'chichoti');
            User.create({username: 'chichoti', firstName: 'Chicho', lastName: 'Ti', salt: salt, hashedPassword: hashedPassword});

            console.log('Added users to database.');
        }
    });

    function generateSalt () {
        return crypto.randomBytes(128).toString('base64');
    }

    function hashPassword (salt, password) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }
};