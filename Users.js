
/*********************************************************************************************************
 *
 * File: Users
 *
 *********************************************************************************************************/
var mongoose = require('mongoose');                 //npm install mongoose - Mongoose is a MongoDB object modeling
                                                    // tool designed to work in an asynchronous environment.
                                                    // Mongoose supports both promises and callbacks.
                                                    //https://www.npmjs.com/package/mongoose

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');              //npm install bcryptjs - bcrypt-nodejs no longer maintained
                                                    //https://www.npmjs.com/package/bcrypt

mongoose.Promise = global.Promise;

//https://codeburst.io/process-env-what-it-is-and-why-when-how-to-use-it-effectively-505d0b2831e7
mongoose.connect(process.env.DB, {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

//User Schema
var UserSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false}
});

//hash password before the user is saved: encrypt
UserSchema.pre('save', function (next) {
    var user = this;

    //hash password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    //generate hash
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        //change the password to the hashed version
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (password, callback) {
    var user = this;
    bcrypt.compare(password, user.password, function (err, isMatch) {
        callback(isMatch);
    });

    //return the model
    var module = require('exports');                    //https://nodejs.org/api/modules.html#modules_exports
    module.exports = mongoose.model('User', UserSchema);
}
