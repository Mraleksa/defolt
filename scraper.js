var client = require('http-api-client');
const fs = require('fs');


var currentCount =  "2017-05-12T13:53:03.472019+03:00"
var p=0; var p2=0;
var end = +new Date(currentCount)+86400000*10
   
   
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

					fs.appendFile("plans5.json", res);
				
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
			
				if (p2 < 3) {
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
