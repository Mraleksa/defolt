var client = require('http-api-client');
var unique = require('uniq');
var fs = require("fs");

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
console.log(client);


fs.writeFile("nest.csv", unique(data), function(err) {
			console.log("file written");
		});
