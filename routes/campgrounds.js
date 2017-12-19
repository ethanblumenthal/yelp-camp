// dependencies
var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground');

// INDEX - campgrounds
router.get('/', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: allCampgrounds});
        }
    })
});

// NEW - campground
router.get('/new', isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// CREATE - campground
router.post('/', isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect('/campgrounds');
        }
    });
});

// SHOW - campground
router.get('/:id', function(req, res) {
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT - campground
router.get('/:id/edit', function(req, res) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err) {
                res.redirect('campgrounds');
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    res.render('campgrounds/edit', {campground: foundCampground});
                } else {
                    res.send('You do not have permission!');
                }
            }
        })
    } else {
        res.send('You need to be logged in!');
    }
});

// UPDATE - campground
router.put('/:id', function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            res.redirect('campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY - campground
router.delete('/:id', function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('campgrounds');
        } else {
            res.redirect('campgrounds');
        }
    });
});

// login middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = router;