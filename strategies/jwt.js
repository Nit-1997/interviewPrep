var User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret-key';
module.exports = new JwtStrategy(opts, function(jwt_payload, done) {
	console.log('jwt payload');
	console.log(jwt_payload);
    User.findOne({username:jwt_payload.username}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});