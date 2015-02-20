var 
mongojs = require("mongojs"),
http = require ("http");

var 
db = mongojs('mongodb://lottie-em:arcjrules@ds039281.mongolab.com:39281/arcj', ['twitterUsers']);

function requestHandler(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'} );
	response.end("<h1>Server Up!</h1>");
};

http.createServer(requestHandler).listen(5000);

// console.log(db);

// db.getCollectionNames(function(err, collections){
// 	console.log(collections)
// });

// console.log(db.twitterUsers);


// db.runCommand(twitterUsers.find())



function pushToDb(info, destination) {
	db[destination].insert(info);
}

pushToDb({username: "mario", topInterest: "bunnies"}, "twitterUsers");

db.twitterUsers.find(function(err, docs){
	console.log(docs)
});



