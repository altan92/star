var counter = 0;
$(document).ready(function(){	
	var movie = get('movie');
	if (movie==""){
		
		$("#search-header").html('Search Results: Top Rated');
		$.ajax({
		'url': "http://api.themoviedb.org/3/movie/top_rated?api_key=d1d7ccec36948efe0fe4750abc77836f",
		//'url': "http://api.themoviedb.org/3/movie/157336?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {

			
			imageLinkPrinter(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
		});
		var articleURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=popular&fq=movies&api-key=";
	 $.ajax({
		'url': articleURL+"bcc7dfa0080d4655266e442f77465546:2:70159037",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			// var stringData = JSON.stringify(data);
			// localStorage.setItem("articles", stringData);
			// printArticleData(); 
			
			for(var i = 0; i < data.response.docs.length; i++){
				var first_article = data.response.docs[i];
				first_article["print_headline"]= first_article.headline.main;
				var articles = ich.each_article(first_article);
				$("#each_article").append(articles);
			}
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
		});
	}   
	else{
	// console.log(parse_date(date));
	$("#search-header").html('Search Results: '+ movie);
	
	$.ajax({
		'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + movie,
		//'url': "http://api.themoviedb.org/3/movie/157336?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {

			if(data.results.length ==0){
				$("#searches").html("<h1 style='color:red;'>No movies found!</h1>"); 
			}
			else {
				imageLinkPrinter(data);
			}
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
		 var articleURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+ movie + "&fq=movies&api-key=";
	 $.ajax({
		'url': articleURL+"bcc7dfa0080d4655266e442f77465546:2:70159037",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			// var stringData = JSON.stringify(data);
			// localStorage.setItem("articles", stringData);
			// printArticleData(); 
			
			for(var i = 0; i < data.response.docs.length; i++){
				var first_article = data.response.docs[i];
				first_article["print_headline"]= first_article.headline.main;
				var articles = ich.each_article(first_article);
				$("#each_article").append(articles);
			}
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
		});
	}

	function capitalize(string)
		{
		    return string.charAt(0).toUpperCase() + string.slice(1);
		}     

	function parseTitle(string){
		var answer = "";
		arr = string.split(" ")
		for (var item in arr){
			answer = answer + capitalize(arr[item].toLowerCase())+" ";

		}
		return answer;
	}

	function parseVote(rating){
		return roundnum(rating);
	}

	function roundnum(n) {
		var rating = (Math.round(n)/2)+1;
		var answer = ""
		while (rating > 1){
			rating = rating - 1;
			answer = answer + "&#9733;"
		}
		return answer;
	}

	function imageLinkPrinter(imageLink){
	for(var i = 0; i < imageLink.results.length; i++){
		var first_photo = imageLink.results[i];
		if(first_photo["poster_path"] == null){
			continue;
		}
		$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie/" + +"?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/" + first_photo["id"] + "?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			//temp.push(data);
			// console.log(temp);
			counter = (counter + 1)%3;
			console.log(data);
			append(data, counter);
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
		}}
	function capitalize(string)
	{
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}     

	function parseTitle(string){
		var answer = "";
		arr = string.split(" ")
		for (var item in arr){
			answer = answer + capitalize(arr[item].toLowerCase())+" ";

		}
		return answer;
	}
	function parseVote(rating){
		return roundnum(rating);
	}

	function roundnum(n) {
		var rating = (Math.round(n)/2)+1;
		var answer = ""
		while (rating > 1){
			rating = rating - 1;
			answer = answer + "&#9733;"
		}
		return answer;
	}
	function append(first_photo, i){
		console.log(first_photo);
		
		first_photo["poster_path"]= "https://image.tmdb.org/t/p/original" + first_photo["poster_path"];
		first_photo["backdrop_path"]= "https://image.tmdb.org/t/p/original" + first_photo["backdrop_path"];
		first_photo["overview"] = first_photo["overview"].split(" ").slice(0,30).join(" ");
		first_photo["overview"] = first_photo["overview"] + ".... "
		var button = '<span class="add-to-list" id="'+first_photo["title"]+'@'+first_photo["backdrop_path"]+'@'+first_photo["id"]+'">';
        button = button + '<div class="pure-button btn-custom" href="#">Add to watch list!</div></span>';
        first_photo["button"] = button;
		first_photo['title']=parseTitle(first_photo['title']);
		var query = first_photo['title'].replace('\'','').replace('\"','').split(" ").join("+");
		query = query.substring(0, query.length - 1);
		first_photo['query'] = query + '/' + first_photo['id'];;
		if(first_photo["tagline"]==""){
			first_photo["tagline"] = "Love is a friendship set to music";
		}
		first_photo["rating"] = parseVote(first_photo["vote_average"]);



		var images = ich.searches(first_photo);
		$('#searches').append(images);
		if (i == 0){
			$(".pop").popover({
			  trigger: "manual",
			  placement: "left",
			}).on("click", function(e) {
			  e.preventDefault();
			}).on("mouseenter", function() {
			  var _this = this;
			  $(this).popover("show");
			  $(this).siblings(".popover").on("mouseleave", function() {
			    $(_this).popover('hide');
			  });
			}).on("mouseleave", function() {
			  var _this = this;
			  setTimeout(function() {
			    if (!$(".popover:hover").length) {
			      $(_this).popover("hide")
			    }
			  }, 100);
			});
		} else {
			//$("[data-toggle=popover]").popover({trigger:"hover", container: $(this)});
			/*$(".pop").popover({trigger:"hover manual",container: 'body'}).click(function(e) {
                e.preventDefault() ;
            }).mouseenter(function(e) {
                $(this).popover('show');
            });*/
			$(".pop").popover({
			  trigger: "manual",
			}).on("click", function(e) {
			  e.preventDefault();
			}).on("mouseenter", function() {
			  var _this = this;
			  $(this).popover("show");
			  $(this).siblings(".popover").on("mouseleave", function() {
			    $(_this).popover('hide');
			  });
			}).on("mouseleave", function() {
			  var _this = this;
			  setTimeout(function() {
			    if (!$(".popover:hover").length) {
			      $(_this).popover("hide")
			    }
			  }, 100);
			});
		}
		// counter = counter+1; 
		//console.log(imageLink.results[i]);
		//console.log(imageLink.results[i].backdrop_path);
	}


	function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}

});