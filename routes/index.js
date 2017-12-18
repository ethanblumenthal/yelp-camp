// dependencies
var express = require('express'),
    router = express.Router(),
    passport = require('passport');
    User = require('../models/user');

// SHOW - root
router.get('/', function(req, res) {
    res.render('landing');
});

// SHOW - signup
router.get('/signup', function(req, res) {
    res.render('signup');
});

// CREATE - signup
router.post('/signup', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            return res.render('signup');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('campgrounds');
        });
    });
});

// SHOW - login
router.get('/login', function(req, res) {
    res.render('login');
});

// CREATE - login
router.post('/login', passport.authenticate('local', {
    successRedirect: 'campgrounds',
    failureRedirect: 'login'
}), function(req, res) {
});

// logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('campgrounds');
});

// login middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;