var template = require('./templates/sampleTemplate.html');
var $ = require('jquery');


$('#page').html(template(
	{"articles":[
	{"title":"Connective DX, Day One", "index":"1", "postDate":"June 1, 2016"},
	{"title":"Connective DX, Day Two", "index":"2", "postDate":"June 2, 2016"},
	{"title":"Organization (Days Three and Four)", "index":"3", "postDate":"June 5, 2016"},
	{"title":"For lack of a better title -- Week 2", "index":"4", "postDate":"June 14, 2016"},
	{"title":"Static vs. Dynamic Sites", "index":"5", "postDate":"June 15, 2016"},
	{"title":"The Pitfalls of Templating and Nunjucks", "index":"6", "postDate":"June 17, 2016"},
	{"title":"How to Template Successfully (Nunjucks/Gulp)", "index":"7", "postDate":"June 21, 2016"},
	{"title":"Version 1.0 and Rebuilding", "index":"8", "postDate":"June 23, 2016"}
	]}));