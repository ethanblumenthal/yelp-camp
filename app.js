// module imports
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// display landing page
app.get('/', function(req, res) {
    res.render('landing');
});

// display all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
        }
    })
});

// display new campground form
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

// add new campground to database
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// start server
app.listen(3000, function() {
    console.log('Serving on port 3000');
});