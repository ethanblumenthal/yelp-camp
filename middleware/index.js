// dependencies
var Campground = require('../models/campground'),
    Comment = require('../models/comment');

var middlewareObj = {};

// authentication middleware
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please login!');
    res.redirect('/login');
};

// campground authorization middleware
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                req.flash('error', 'Campground not found!');
                res.redirect('back');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Not authorized!');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'Please login!');
        res.redirect('back');
    }
};

// comment authorization middlware
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash('error', 'Comment not found!');
                res.redirect('back');
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash('error', 'Not authorized!');
                    res.redirect('back');
                }
            }
        })
    } else {
        req.flash('error', 'Please login!');
        res.redirect('back');
    }
};

module.exports = middlewareObj;