
var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	mongojs = require("mongojs"),
	Twitter = require('twitter'),
	events = require('events'),
	insta = require('instagram-node').instagram(),
	tweetObj = {},
	// key = require('./key.js');
	key = new Twitter ({
	consumer_key: '0NE1Xoy4LOwiRuPBQYOZxAdsy',
	consumer_secret: 'FwlWrejjFsJzh57JSd1OXlVFi2djcghERQNhHWsYZkgCLKUVxZ',
	access_token_key: '281746499-SfqRkJFWWD447WgouP184FlS1EkJ6CTJajYT5G0A',
	access_token_secret: 'uzLRrD1ZAi2UgNk12kK7F6HQq4AXZNW8rG8mbsR2z6WsI'
	}),
	db = mongojs('mongodb://lottie-em:arcjrules@ds039281.mongolab.com:39281/arcj', ['twitterUsers']);
	type = 'search/tweets',
	params = {
		q: 'fruit',
		filter: 'images',
		include_entities: true,
		result_type: 'images'
	},
	tweetArray = [];

function requestHandler(request, response){
	var reqName = path.basename(request.url) || 'index.html';
	if (reqName === 'tweets') {
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write(tweets);
	} else {
		fs.readFile(__dirname + '/' + 'index.html', function(err, data){
			if (!err) {
				response.writeHead(200, {'Content-Type': 'text/html'});
				response.write(data);
				response.end();
			} else {
				response.writeHead(404, {'Content-Type': 'text/html'});
				response.end('<h1>Error</h1>');
			}
		});
	}
}

http.createServer(requestHandler).listen(1337);
console.log('Server up and running');

//TWITTER

// catchfish sends get req to twitter for the param
function catchFish(){
	key.get(type, params, fishGutter);
}

//fishgutter pulls the tweets from the json obj and adds to twitter object
function fishGutter(error, data, response){
		for(var i = 0; i < data.statuses.length; i += 1) {
			tweetObj = {
				tweetStatus: data.statuses[i].text,
				tag: params.q,
				mediaUrl: data.statuses[i].entities.media[0].media_url
			}	
			tweetArray.push(tweetObj);
		}
		pushToDb(tweetArray, "twitterUsers");
	}

//DB

// push info to database

function pushToDb(info, destination) {
	db[destination].insert(info);
}
 
// start the function chain 

catchFish();



