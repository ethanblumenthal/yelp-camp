var mongoose = require('mongoose'),
    Campground = require('./models/campground');

var data = [
    {
    name: 'Yellowstone',
    image: 'http://www.wallpapers13.com/wp-content/uploads/2016/03/Beautiful-HD-Wallpaper-Geyser-Yellowstone-National-Park-USA-915x515.jpg',
    description: "Yellowstone National Park is a nearly 3,500-sq.-mile wilderness recreation area atop a volcanic hot spot. Mostly in Wyoming, the park spreads into parts of Montana and Idaho too. Yellowstone features dramatic canyons, alpine rivers, lush forests, hot springs and gushing geysers, including its most famous, Old Faithful. It's also home to hundreds of animal species, including bears, wolves, bison, elk and antelope."
    },     
    {
    name: 'Yosemite',
    image: 'https://assets3.thrillist.com/v1/image/1704223/size/tmg-facebook_social.jpg',
    description: "Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome. In Yosemite Village are shops, restaurants, lodging, the Yosemite Museum and the Ansel Adams Gallery, with prints of the photographer’s renowned black-and-white landscapes of the area."
    },
    {
    name: 'Joshua Tree',
    image: 'https://images5.alphacoders.com/515/515766.jpg',
    description: "Joshua Tree National Park is a vast protected area in southern California. It's characterized by rugged rock formations and stark desert landscapes. Named for the region’s twisted, bristled Joshua trees, the park straddles the cactus-dotted Colorado Desert and the Mojave Desert, which is higher and cooler. Keys View looks out over the Coachella Valley. Hiking trails weave through the boulders of Hidden Valley."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, function(err) {
        if (err) {
            consoloe.log(err);
        } else {
            console.log('Removed campgrounds');
            // add seed campgrounds
            data.forEach(function(seed) {
                Campground.create(seed, function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Added a campground')
                    }
                });
            });
        }
    });
}

module.exports = seedDB;