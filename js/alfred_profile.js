$(document).ready(function(){
	var res = get('movie').split("/");
	var movie = res[0];
	var id = res[1];

	$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/" + id + "/videos?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			
			var first_trailer = data.results[0];
			first_trailer["movietrailer"]= "https://youtube.com/embed/" + first_trailer["key"] + "?autoplay=0&controls=1&showinfo=0&autohide=1"; 
			var trailers = ich.video(first_trailer);
			$("#video").append(trailers);

			
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
	
	$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/" + id + "?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			
			var response = data; 
			var genre="";
			for (var i = 0; i < response.genres.length ;i++) {
				if(i==(response.genres.length-1)){
					genre = genre + 'and ' + response.genres[i].name;
					break;
				}
				genre = genre + response.genres[i].name + ', ';

			}
			response['genre'] = genre;
			response["poster_path"]= "https://image.tmdb.org/t/p/original" + response["poster_path"];
			$.ajax({
				'url': "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=bx8uz4gdtrn2kx87czmpby74&q=" + movie + "&page_limit=1",
				'type': 'GET',
				'dataType': "jsonp",
				success: function(data, textStats, XMLHttpRequest) {	
					console.log(data);
					output = data.movies[0];
					var cast ="";
					for (var i = 0; i < output.abridged_cast.length ;i++) {
						console.log(output.abridged_cast[i]);
						if(i==(output.abridged_cast.length-1)){

							cast = cast + 'and ' + output.abridged_cast[i].name;
							break;
						}
						cast = cast + output.abridged_cast[i].name + ', ';

					}
					var button = '<span class="add-to-list" id="'+response["title"]+'@'+response["backdrop_path"]+'">';
        			button = button + '<div id="watch_more" class="pure-button btn-custom" href="#">Add to watch list!</div></span>';
        			console.log(button);
        			response["button"] = button;
					response["cast"] = cast;
					response["audience_rating"] = output.ratings.audience_rating;
					response["audience_score"] = output.ratings.audience_score;
					response["critics_rating"] = output.ratings.critics_rating;
					response["critics_score"] = output.ratings.critics_score;
					response["mpaa_rating"] = output.mpaa_rating;
					var movies = ich.movieinfo(response);
					$("#movieinfo").append(movies);
				},
				error: function(data, textStatus, errorThrown) {
					console.log("error");
				}
			});
			
			
		

			
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
	function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}
});