var client = require('http-api-client');
var sqlite3 = require("sqlite3").verbose();

// Open a database handle
var db = new sqlite3.Database("data.sqlite");


	
var currentCount =  "2017-05-15T13:53:03.472019+03:00"
var p=0; var p2=0;
   
   
function piv(){  
p++;
client.request({url: 'https://public.api.openprocurement.org/api/2.3/plans?offset='+currentCount})
		.then(function (data) {
						 
		
			var dataset = data.getJSON().data;
			
			currentCount = data.getJSON().next_page.offset;			
			console.log(currentCount)
			
			return dataset;
		})	
		.then(function (dataset) {	
		
			dataset.forEach(function(item) {
				client.request({url: 'https://public.api.openprocurement.org/api/0/plans/'+item.id})
					.then(function (data) {
var res = '{"id":"'+data.getJSON().data.id+'","datePublished":"'+data.getJSON().data.datePublished+'","cpv":"'+data.getJSON().data.classification.id+'","name":"'+data.getJSON().data.procuringEntity.identifier.id+'", "amount":'+data.getJSON().data.budget.amount+', "currency":"'+data.getJSON().data.budget.currency+'", "procurementMethod":"'+data.getJSON().data.tender.procurementMethod+'","procurementMethodType":"'+data.getJSON().data.tender.procurementMethodType+'","startDate":"'+data.getJSON().data.tender.tenderPeriod.startDate+'"},'
					//console.log(res);

				
					
db.serialize(function() {

  // Create new table
  db.run("CREATE TABLE IF NOT EXISTS data (title TEXT)");
						
						 // Insert a new record
  var statement = db.prepare("INSERT INTO data(title) VALUES (?)");
  statement.run( JSON.parse(res));
  statement.finalize();
});
					})
					.catch(function  (error) {
						console.log("error_detale")
						
					});  
				});
		
		})
		.then(function () {	
		if (p<10){piv ();}		
		else {
			console.log("stop")
				p=0;
				p2++;
				console.log(p2)
			setTimeout(function() {
			
				if (p2 < 15) {
					piv ();
				}
				else {console.log("STOP")}
				}, 5000);
		}		
							
		})
		.catch( function (error) {
		console.log("error")
		piv ();
		});   
		
		
			

}

piv ();	
 
   
//node_modules\http-api-client
