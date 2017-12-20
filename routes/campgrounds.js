// dependencies
var express = require('express'),
    router = express.Router(),
    Campground = require('../models/campground'),
    middleware = require('../middleware'),
    geocoder = require('geocoder');

// Search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// INDEX - campgrounds
router.get('/', function(req, res) {
    if (req.query.search) {
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render('campgrounds/index', {campgrounds: allCampgrounds, page: 'campgrounds'});
            }
        });
    } else {
        Campground.find({}, function(err, allCampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render('campgrounds/index', {campgrounds: allCampgrounds, page: 'campgrounds'});
            }
        });
    }
});

// NEW - campground
router.get('/new', middleware.isLoggedIn, function(req, res) {
    res.render('campgrounds/new');
});

// CREATE - campground
router.post('/', middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
        Campground.create(newCampground, function(err, newlyCreated) {
            if (err) {
                console.log(err);
            } else {
                console.log(newlyCreated);
                req.flash('success', 'Campground added!')
                res.redirect('/campgrounds');
            }
        });
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
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

// UPDATE - campground
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    geocoder.geocode(req.body.campground.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.campground.name, price: req.body.campground.price, image: req.body.campground.image, description: req.body.campground.description, location: location, lat: lat, lng: lng};
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground) {
            if (err) {
                res.redirect('campgrounds');
            } else {
                res.redirect('/campgrounds/' + req.params.id);
            }
        });
    });
});

// DESTROY - campground
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect('campgrounds');
        } else {
            req.flash('success', 'Campground deleted!')
            res.redirect('campgrounds');
        }
    });
});

module.exports = router;