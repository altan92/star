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

			console.log(data);
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
			console.log(data);
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

			
			imageLinkPrinter(data);
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
			console.log(data);
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
		});
	}

	

	function imageLinkPrinter(imageLink){
	var counter=0;
	for(var i = 0; i < imageLink.results.length; i++){
		
		
		var first_photo = imageLink.results[i];
		if(first_photo["poster_path"] == null){
			
			continue;
		}
		
		first_photo["poster_path"]= "https://image.tmdb.org/t/p/original" + first_photo["poster_path"];
		
		// if (1){
  //           $.ajax({
		// 		'url': "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=bx8uz4gdtrn2kx87czmpby74&q=" + "Interstellar" + "&page_limit=1",
		// 		'type': 'GET',
		// 		'dataType': "jsonp",
		// 		'async': true,
		// 		'timeout': 1000,
		// 		success: function(data, textStats, XMLHttpRequest) {	
		// 			console.log(data);
		// 		},
		// 		error: function(data, textStatus, errorThrown) {
		// 			console.log("error");
		// 		}
					
		// 	});
		// }
       
			
		
		var images = ich.searches(first_photo);
		$('#searches').append(images);
		if (((counter+1) % 3) == 0){
			//$("[data-toggle=popover]").popover({trigger:"hover", container: $(this), placement:"left"});
			/*$(".pop").popover({trigger:"hover manual", container: 'body', placement:"left"}).click(function(e) {
                e.preventDefault() ;
            }).mouseenter(function(e) {
                $(this).popover('show');
            });*/
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
		counter = counter+1; 
		//console.log(imageLink.results[i]);
		//console.log(imageLink.results[i].backdrop_path);
	}

}
	function get(name){
	   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(name[1]);
	}

});