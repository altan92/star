
$("#test" ).click(function( event ) {
	event.preventDefault();
	var test =  $( "input:first" ).val() ;
	var splitTest  = test.split(" ");
	var searchString ="";
	for(var i= 0; i < splitTest.length; i++){
		searchString += splitTest[i] + "+";
	}
	searchQuery(searchString);
 	
});

var tomatoeKey = "bx8uz4gdtrn2kx87czmpby74";

function searchQuery(searchQuery){	
	$.ajax({
		'url': "http://api.rottentomatoes.com/api/public/v1.0/movies/770672122.jsonp?apikey="+ tomatoeKey,
		'type': 'GET',
		'dataType': "jsonp",
		success: function(data, textStats, XMLHttpRequest) {
			
			console.log(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
  
}

function printrottenData(){


}


