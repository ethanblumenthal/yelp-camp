var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});

app.get('/campgrounds', function(req, res) {
    var campgrounds = [
        {name: 'Salmon Creek', image: 'https://www.northshorevisitor.com/wp-content/uploads/2015/05/grand-marais-campground-1.jpg'},
        {name: 'Granite Hill', image: 'http://www.suttonfalls.com/communities/4/004/012/498/244//images/4628314067.jpg'},
        {name: 'Mountain Goat Rest', image: 'http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg'}
    ];
    res.render('campgrounds');
});

app.listen(3000, function() {
    console.log('Serving on port 3000');
});