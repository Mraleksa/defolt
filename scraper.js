var sqlite3 = require("sqlite3").verbose();
var unique = require('uniq');

// Open a database handle
var db = new sqlite3.Database("data.sqlite");
db.serialize(function() {

  // Create new table
  db.run("CREATE TABLE IF NOT EXISTS data (title TEXT)");

  // Insert a new record
  var statement = db.prepare("INSERT INTO data(title) VALUES (?)");
  statement.run( Math.round(Math.random()*100));
  statement.finalize();
});

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
