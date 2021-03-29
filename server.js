var express = require('express');           //npm install express - creates package-lock.json
                                            //https://www.npmjs.com/package/express
var http = require('http');

var bodyParser = require('body-parser');    //This parser supports automatic inflation of gzip and deflate encodings.
                                            // A new body object containing the parsed data is populated on the request
                                            // object after the middleware
var passport = require('passport');         //Passport is Express-compatible authentication middleware for Node

var authController = require('./old_code/auth');  //

var authJwtController = require('./auth_jwt');
//db = require('./db')();       //old code
var jwt = require('jsonwebtoken');          //npm install jsonwebtoken

var cors = require('cors');                 //npm install cors

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req){
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if(req.body != null){
        json.body = req.body;
    }
    return json;
}
/***************************************************************************************************************
* Create new user
* *************************************************************************************************************/
router.post('/signup', function(req,res){
    if(!req.body.username || !req.body.password){
        res.json({success: false, msg: 'Please include both username and password to signup'})
    }else{
        var newUser = {
            username: req.body.username,
            password: req.body.password
        };

        //db.save(newUser);     //old code mock db, edit to use official mongoose db
        console.log('fix stored user L51--erase when done');      //flag to correct - delete when done
        res.json({success: true, msg: 'Successfully created new user'})
    }
});
/***************************************************************************************************************
 * Signin
 * *************************************************************************************************************/
router.post('/signin', function(res, res){
    var user = db.findOne(req.body.username);
    console.log('Correct to new mongoose L60, should fail by default until fixed -- delete when done');

    if(!user){
        res.status(401).send({success: false, msg: 'Authentication failed. User not found'})
    }else{
        if(req.body.password == user.password){
            var userToken = {id: user.id, username: user.username};
            var token = jwt.sign(userToken, process.env.SECRET_KEY);
            res.json({success: true, token: 'JWT ' + token});
        } else {
            res.status(401).send({success: false, msg: 'Authentication failed.'});
        }
    }
});

/***************************************************************************************************************
 * Testing
 * *************************************************************************************************************/
router.route('/testcollection')
    .delete(authController.isAuthenticated, function(req,res){
        console.log(req.body);
        res = res.status(200);
        if(req.get('Content-Type')){
            res = res.type(req.get('Content-Type'));
        }
        var o = getJSONObjectForMovieRequirement(req);
        res.json(o);
    })
    .put(authJwtController.isAuthenticated, function(req, res){
        console.log(req.body);
        res = res.status(200);
        if(req.get('Content-Type')){
            res = res.type(req.get('Content-Type'));
        }
    });

app.use('/', router);
app.listen(process.env.PORT || 8080);
module.exports = app;       //for testing only


/***************************************************************************************************
 * Movies
 * *************************************************************************************************/
