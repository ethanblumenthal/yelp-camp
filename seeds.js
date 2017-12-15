var mongoose = require('mongoose'),
    Campground = require('./models/campground');

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            consoloe.log(err);
        } else {
        console.log('Removed campgrounds');
        }
    });
}

module.exports = seedDB;