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
			response["poster_path"]= "https://image.tmdb.org/t/p/original" + response["poster_path"];
			$.ajax({
				'url': "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=bx8uz4gdtrn2kx87czmpby74&q=" + movie + "&page_limit=1",
				'type': 'GET',
				'dataType': "jsonp",
				success: function(data, textStats, XMLHttpRequest) {	
					console.log(data);
					output = data.movies[0];
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