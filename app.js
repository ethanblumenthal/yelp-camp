var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var campgrounds = [
    {name: 'Salmon Creek', image: 'https://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg'},
    {name: 'Granite Hill', image: 'http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg'},
    {name: 'Mountain Goat Rest', image: 'http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg'},    {name: 'Salmon Creek', image: 'https://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg'},
    {name: 'Granite Hill', image: 'http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg'},
    {name: 'Mountain Goat Rest', image: 'http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg'},
    {name: 'Salmon Creek', image: 'https://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg'},
    {name: 'Granite Hill', image: 'http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg'},
    {name: 'Mountain Goat Rest', image: 'http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg'}
];

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect('/campgrounds');
});

app.listen(3000, function() {
    console.log('Serving on port 3000');
});