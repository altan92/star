$(document).ready(function(){
	

	//nytime
	var nyt_keys = ({
		community: "db60e066b9b395d9b9edddb71342a983:13:70159037",
        article: "bcc7dfa0080d4655266e442f77465546:2:70159037",
        movie: "a0d0c0d77f5bd871613018e23c2d4d85:8:70159037" 
    });


	// on clicking the search button
	$(document).on("click","#nytsearch",function(){
			
		var movie_name = $("input[name='movie']").val();
		var movie_parts = movie_name.split(" ");
		var movie_query = movie_parts[0];

		// build The+Hunger+Games
		for(i=1; i<movie_parts.length; i++){
			movie_query= movie_query+"+"+movie_parts[i]
		}

		$.ajax({
		url: "http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query="+movie_query+"&api-key="+nyt_keys.movie,
    	dataType: 'jsonp', 
    	success:function(json){
    		console.log(json)
    		var results = json.results;
  			
    	},
    	error:function(){
        	alert("Error");
    	},
		});
	});

});



