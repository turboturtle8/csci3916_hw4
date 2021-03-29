/*********************************************************************************************************
 *
 *File: auth_jwt.js
 *Messing with file structure to learn how to isolate for security(??)
 * Not recreating variables obviously due to duplicate errors.
 * ******************************************************************************************************/
var passport = require('passport');
var JwtStrategy = require('passport-jwt').strategy;     //A Passport strategy for authenticating with a JSON Web Token.
                                                        // This module lets you authenticate endpoints using a JSON web
                                                        // token. http://www.passportjs.org/packages/passport-jwt/

var ExtractJwt = require('passport-jwt').ExtractJwt;    //npm install passport-jwt
//var User = require('/Users');
var User = require('/Users');

var opts = {};
opts._jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done){
    User.findById(jwt_payload.id, function(err, user){
        if(user){
            done(null, user);
        }else{
            done(null, false);
        }
    });
}));

exports.isAuthenticated = passport.authenticate('jwt', {session: false});
exports.secret = opts.secretOrKey;
