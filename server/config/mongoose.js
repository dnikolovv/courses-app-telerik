var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalPassport = require('passport-local');

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
        //salt: String,
        //hashPass: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, users) {

        if (err) {
            console.log("Couldn't query users: " + err);
            return;
        }

        if (users.length === 0) {
            User.create({username: 'dnikolovv', firstName: 'Dobromir', lastName: 'Nikolov'});
            User.create({username: 'stamatovv', firstName: 'Stamat', lastName: 'Stamatovv'});
            User.create({username: 'chichoti', firstName: 'Chicho', lastName: 'Ti'});

            console.log('Added users to database.');
        }
    });

    passport.use(new LocalPassport(function (username, password, done) {

        User.findOne({username: username}).exec(function (err, user) {

            if (err) {
                console.log('Error finding user with username ' + username + ': ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });

    }));

    passport.serializeUser(function (user, done) {

        if (user) {
            return done(null, user._id);
        }
    });
    
    passport.deserializeUser(function (id, done) {

        User.findOne({_id: id}).exec(function (err, user) {

            if (err) {
                console.log('Error finding user with username ' + username + ': ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    });
};