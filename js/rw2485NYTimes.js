
/* The new times Articles Api provides large images for movies we dont actuall
y need to query the movie database. I have added console logs for all
the relevent data */

$(document).ready(function(){	
	var NYTimesKey = ({
        community: "db60e066b9b395d9b9edddb71342a983:13:70159037",
        article: "bcc7dfa0080d4655266e442f77465546:2:70159037",
        movie: "a0d0c0d77f5bd871613018e23c2d4d85:8:70159037" 
    });
    var randomUrl = "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=";
    var moviesUrl = "http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query=the+hunger+games&api-key=";
	var articleURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=movies&fq=The+hunger+games&api-key=";
	var searchQuery= "Hunger Games";
	$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/popular?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			imageLinkPrinter(data);
			console.log(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
	

$(document.body).on('click', '#movieReview', function() {
	movieReviews();
	
});

$(document.body).on('click', '#relatedArticles', function() {
	relatedArticle();
	
});

function movieReviews(){
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

function relatedArticle(){
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


function printMovieData(){
	var temp = JSON.parse(localStorage.getItem("movieReviews"));
	console.log("Movie Data from New York Times");
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
		var images = ich.images(first_photo);
		$('#images').append(images);
		//console.log(imageLink.results[i]);
		//console.log(imageLink.results[i].backdrop_path);
	}

}



});

	