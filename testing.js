var 
mongojs = require("mongojs"),
http = require ("http"),
db = mongojs('mongodb://charlotte:fac@ds039281.mongolab.com:39281/testingdb', ['testingfac']);

function requestHandler(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'} );
	response.end("<h1>Server Up!</h1>");
};

http.createServer(requestHandler).listen(6000);


console.log(db);

// db.getCollectionNames(function(err, collections) {
// 	console.log(collections);
// })

// function pushToDb(info, destination) {
// 	db[destination].insert(info);
// }

// pushToDb({username: "mario", topInterest: "bunnies"}, "testingfac");
// pushToDb({username: "jenny", topInterest: "frogs"}, "testingfac");

db.testingfac.find(function(err, docs){
	console.log(docs)
});