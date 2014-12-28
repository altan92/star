// I have added console logs for all the relevent dat
var tomatoeKey = "bx8uz4gdtrn2kx87czmpby74";

$("#test" ).click(function() {
	event.preventDefault();
	var test =  $( "input:first" ).val() ;
	var splitTest  = test.split(" ");
	var searchString ="";
	for(var i= 0; i < splitTest.length; i++){
		searchString += splitTest[i] + "+";
	}
	rottenSearchQuery(searchString);
 	
});

$("#boxOfficelist").click(function() {
	rottenBoxOffice();
});


function rottenBoxOffice(){	
	$.ajax({
		'url': "http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json?apikey="+ tomatoeKey,
		'type': 'GET',
		'dataType': "jsonp",
		success: function(data, textStats, XMLHttpRequest) {	
			
			printBoxOffice(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
  
}



function rottenSearchQuery(searchQuery){	
	$.ajax({
		'url': "http://api.rottentomatoes.com/api/public/v1.0/movies/770672122.jsonp?apikey="+ tomatoeKey,
		'type': 'GET',
		'dataType': "jsonp",
		success: function(data, textStats, XMLHttpRequest) {	
			printRottenData(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
  
}


function printBoxOffice(data){
	console.log("BOX OFFICE LIST");
	console.log(data);

	for (var i = 0 ; i < data.movies.length; i++) {
		console.log(data.movies[i]["title"]);
	};
}


function printRottenData(data){
	console.log(data["title"]);
	console.log(data["synopsis"]);
	console.log("Cast");
	for (var i = 0 ; i < data["abridged_cast"].length; i++) {
		console.log(data["abridged_cast"][i]["name"]);
	};
	console.log(data["links"]["similar"]);
	console.log(data["ratings"]["audience_score"]);
	console.log(data["ratings"]["critics_score"]);
	console.log(data["alternate_ids"]["imdb"]);
	
}


