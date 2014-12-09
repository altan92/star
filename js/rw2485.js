//home page movie tiles call for popular movies
$(document).ready(function(){	
	$.ajax({
		'url': "http://api.themoviedb.org/3/movie/popular?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			imageLinkPrinter(data);
			// console.log(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}

});
//api keys
var tomatoeKey = "bx8uz4gdtrn2kx87czmpby74";
var imdbKey = "b7bef84";
var NYTimesKey = ({
        community: "db60e066b9b395d9b9edddb71342a983:13:70159037",
        article: "bcc7dfa0080d4655266e442f77465546:2:70159037",
        movie: "a0d0c0d77f5bd871613018e23c2d4d85:8:70159037" 
    });
    var randomUrl = "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=";
	


//the search bar. Any query typed here will result in a list of movies 
//from rotten tomatoes to populate the search page. Every movie has an
// id. Onclick on a specific movie will used this id to bring movie specific information
$("#target").submit(function() {
	event.preventDefault();
	var test =  $( "input:first" ).val() ;
	var searchString = test.split(' ').join('+');
	rottenSearchQuery(searchString);
	// imdb(searchString)
 	// rottenBoxOffice();
});

//clicking this will search the movie by id 
$(document.body).on('click', '#relatedArticles', function() {
	var movieID = "770672122"; // get this value from value saved in html
	rottenSearchQueryWithID(movieID);
});


//this function is connected to the search bar. This will return a list of 
//realted movies. Each HTML Div generated from this should hold the "id" attribute
//The profile page will use that Id to bring indepth infromation
function rottenSearchQuery(searchQuery){				
	var rottenQuery = "http://api.rottentomatoes.com/api/public/v1.0/movies.jsonp?apikey="+ tomatoeKey+ "&q=" +searchQuery + "&page_limit=30";
	$.ajax({
		'url': rottenQuery,
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

//using the value="moiveID" from the div on the search page. 
function rottenSearchQueryWithID(movieID){	
	$.ajax({
		'url': "http://api.rottentomatoes.com/api/public/v1.0/movies/"+ movieID +".jsonp?apikey="+ tomatoeKey,
		'type': 'GET',
		'dataType': "jsonp",
		success: function(data, textStats, XMLHttpRequest) {	
			// rottenDataforSpecificMovie(data);
			var searchThisMovie  = data["title"].split(' ').join('+');
			searchQuery(searchThisMovie);
			rotten_similar_reviews(data["links"]["similar"] ,data["links"]["reviews"]);
			relatedArticle(searchThisMovie);
		 	movieReviews(searchThisMovie);	 	

		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
  
}

//calling movie DB to get a high res image for the profile page
function searchQuery(searchQuery){
	console.log(searchQuery);
	$.ajax({
		
		'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			// imageLinkPrinter(data);
			console.log(data);

		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
  
}



//get movie revies and simmilar movies for the profile page
function rotten_similar_reviews(similar , reviews){
 
 	//calls for simmilar movies 
	$.ajax({
	'url': similar+"p?apikey=" + tomatoeKey,
	'type': 'GET',
	'dataType': "jsonp",
	success: function(data, textStats, XMLHttpRequest) {
		console.log(data);
		// var stringData = JSON.stringify(data);
		// localStorage.setItem("movieReviews", stringData);
		// printMovieData(); 
	},
	error: function(data, textStatus, errorThrown) {
		console.log("error");
	}
	});

	//calls for reviews
	$.ajax({
	'url': reviews+"p?apikey=" + tomatoeKey,
	'type': 'GET',
	'dataType': "jsonp",
	success: function(data, textStats, XMLHttpRequest) {
		console.log(data);
		// var stringData = JSON.stringify(data);
		// localStorage.setItem("movieReviews", stringData);
		// printMovieData(); 	
	},
	error: function(data, textStatus, errorThrown) {
		console.log("error");
	}
	});

}

//NY time movie reviews for the search String
function movieReviews(searchString){
var moviesUrl = "http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query=" + searchString +"&api-key=";
 console.log("inside movie reviews");
 $.ajax({
	'url': moviesUrl+NYTimesKey.movie,
	'type': 'GET',
	'dataType': "jsonp",
	success: function(data, textStats, XMLHttpRequest) {
		
		var stringData = JSON.stringify(data);
		localStorage.setItem("movieReviews", stringData);
		printMovieData(); 
	
	},
	error: function(data, textStatus, errorThrown) {
		console.log("error");
	}
	});
 		// console.log(data);
}

//NyTimes related articles for search string. This is filtered for movies
function relatedArticle(searchString){
 var articleURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchString + "&fq=movies&api-key=";
 $.ajax({
	'url': articleURL+NYTimesKey.article,
	'type': 'GET',
	'dataType': "json",
	success: function(data, textStats, XMLHttpRequest) {
		var stringData = JSON.stringify(data);
		localStorage.setItem("articles", stringData);
		printArticleData(); 
	},
	error: function(data, textStatus, errorThrown) {
		console.log("error");
	}
	});
 		
}


//this will print all the articles returned related to any movie name
//in this case it return articles related to hunger names. If the name 
//is types correctly we we can use just the first obect return as it will
// the most relevant. 
function printArticleData(){
	var temp = JSON.parse(localStorage.getItem("articles"));
	// console.log(temp.results[0]["display_title"]);
	console.log("Articles from New York Times");
	// console.log(temp);

	for (var i = 0; i < temp.response.docs.length ;i++) {
		var movie_name  = temp.response.docs[i]["headline"]["kicker"];
		var movie_headline  = temp.response.docs[i]["headline"]["print_headline"];
        var lead_paragraph  = temp.response.docs[i]["lead_paragraph"];

        //there are large images on New York times API but not always
        console.log(movie_name);
        console.log(movie_headline);
        console.log(lead_paragraph);
        if (temp.response.docs[i].multimedia[1]){
        	var large_image  = temp.response.docs[i].multimedia[1].url;	
        	console.log(large_image);
        }
        var web_url  = temp.response.docs[i]["web_url"];      
	};
	
}

function imageLinkPrinter(imageLink){
	for(var i = 0; i < imageLink.results.length; i++){
		var first_photo = imageLink.results[i];
		first_photo["poster_path"]= "https://image.tmdb.org/t/p/original" + first_photo["poster_path"];
		// var images = ich.images(first_photo);
		// $('#images').appends(images);
		//console.log(imageLink.results[i]);
		//console.log(imageLink.results[i].backdrop_path);
	 }

	}

});

//------------------------------------------------------------
//movie db

(function() {
	window.tmdb = {
		"api_key": "d1d7ccec36948efe0fe4750abc77836f",
		"base_uri": "http://api.themoviedb.org/3",
		"images_uri": "http://image.tmdb.org/t/p",
		"timeout": 5000,
		call: function(url, params, success, error){
			var params_str ="api_key="+tmdb.api_key;
			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					params_str+="&"+key+"="+encodeURIComponent(params[key]);
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.timeout = tmdb.timeout;
			xhr.ontimeout = function () {
				throw("Request timed out: " + url +" "+ params_str);
			};
			xhr.open("GET", tmdb.base_uri + url + "?" + params_str, true);
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.responseType = "text";
			xhr.onreadystatechange = function () {
				if (this.readyState === 4) {
					if (this.status === 200){
						if (typeof success == "function") {
							success(JSON.parse(this.response));	
						}else{
							throw('No success callback, but the request gave results')
						}
					}else{
						if (typeof error == "function") {
							error(JSON.parse(this.response));
						}else{
							throw('No error callback')
						}
					}
				}
			};
			xhr.send();
			// tmdb.call(url, params, success, error);
		}
	}
})()


function rottenDataforSpecificMovie(data){
	console.log(data);
	var title = data["title"];
}

function imageLinkPrinter(imageLink){
	for(var i = 0; i < imageLink.results.length; i++){
		console.log(imageLink.results[i]);
		console.log(imageLink.results[i].backdrop_path);
	}
}

function printMovieData(){
	var temp = JSON.parse(localStorage.getItem("movieReviews"));
	console.log("Movie Data from New York Times");
	console.log(temp)
	for (var i = 0; i < temp.results.length ;i++) {
        var movieTitle  = temp.results[i]["display_title"];
        var headline  = temp.results[i]["headline"];
        var summary_short  = temp.results[i]["summary_short"];
        var trailers_link  = temp.results[i]["related_urls"][4]["url"];
        console.log(movieTitle);
        console.log(headline);
        console.log(summary_short);
        console.log(trailers_link);
		
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

function printBoxOffice(data){
	console.log("BOX OFFICE LIST");
	console.log(data);

	for (var i = 0 ; i < data.movies.length; i++) {
		console.log(data.movies[i]["title"]);
	};
}


function imdb(searchString){
	console.log(searchString);
	var imdbRequest = "http://www.omdbapi.com/?t="+ searcharchString +"&y=&plot=full&r=jsonp"
	$.ajax({
			'url': imdbRequest,
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



//list of BoxOffice movies from rotten tomatoes
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



//cauracel

jQuery(document).ready(function() {
	// $('.carousel').carousel({
 //    	pause: "false",
 //    	interval: 4000
	// });

	// $('.carousel').css({'margin': 0, 'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
	// $('.carousel .item').css({'position': 'relative', 'width': '100%', 'height': '90%'});
	// $('.carousel-inner div.item img').each(function() {
	// 	var imgSrc = $(this).attr('src');
	// 	$(this).parent().css({'background': 'url('+imgSrc+') center center no-repeat', '-webkit-background-size': '100% ', '-moz-background-size': '100%', '-o-background-size': '100%', 'background-size': '100%', '-webkit-background-size': 'cover', '-moz-background-size': 'cover', '-o-background-size': 'cover', 'background-size': 'cover'});
	// 	$(this).remove();
	// });

	// $(window).on('resize', function() {
	// 	$('.carousel').css({'width': $(window).outerWidth(), 'height': $(window).outerHeight()});
	// });
}); 


	

