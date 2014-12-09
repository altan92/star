
/* The new times Articles Api provides large images for movies ` dont actuall
y need to query the movie database. I have added console logs for all
the relevent data */
var counter = 0;
$(document).ready(function(){	
	$("[data-toggle=popover]").popover();
	var NYTimesKey = ({
        community: "db60e066b9b395d9b9edddb71342a983:13:70159037",
        article: "bcc7dfa0080d4655266e442f77465546:2:70159037",
        movie: "a0d0c0d77f5bd871613018e23c2d4d85:8:70159037" 
    });
    var randomUrl = "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=";
    var moviesUrl = "http://api.nytimes.com/svc/movies/v2/reviews/search.jsonp?query=james+cameron&api-key=";
	var articleURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=movies&fq=The+hunger+games&api-key=";
	var searchQuery= "Hunger Games";
	
	$.ajaxSetup({
    timeout: 3000, 
    retryAfter:7000
	});
	$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/popular?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {

			imageLinkPrinter(data);
			
			
		},
		error: function(data, textStatus, errorThrown) {
			console.log("error");
		}
	});
	// $.ajax({
	// 	//'url': "https://api.themoviedb.org/3/search/movie/" + +"?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
	// 	'url': "http://api.themoviedb.org/3/movie/" + first_photo["id"] + "?api_key=d1d7ccec36948efe0fe4750abc77836f",
	// 	'type': 'GET',
	// 	'dataType': "json",
	// 	success: function(data, textStats, XMLHttpRequest) {

			
	// 		console.log(data);
	// 	},
	// 	error: function(data, textStatus, errorThrown) {
	// 		console.log("error");
	// 	}
	// });

	// $.ajax({
	// 	'url': "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=bx8uz4gdtrn2kx87czmpby74&q=The Maze Runner&page_limit=1",
	// 	'type': 'GET',
	// 	'dataType': "jsonp",
	// 	success: function(data, textStats, XMLHttpRequest) {	
	// 		console.log(data);
	// 	},
	// 	error: function(data, textStatus, errorThrown) {
	// 		console.log("error");
	// 	}
	// });
	

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
 }


$(document).ready(function(){	
 $.ajax({
	'url': "http://api.nytimes.com/svc/movies/v2/reviews/all.jsonp?api-key="+NYTimesKey.movie,
	'type': 'GET',
	'dataType': "jsonp",
	success: function(data, textStats, XMLHttpRequest) {
		
		// var stringData = JSON.stringify(data);
		// localStorage.setItem("movieReviews", stringData);
		attachMovieData(data);
		
	},
	error: function(data, textStatus, errorThrown) {
		console.log("error");
	}
	});
 		// console.log(data);
});


function attachMovieData(picks){
	console.log(picks);	
	for (var i = 1 ; i < 10; i++) {

		if('multimedia' in picks.results[i] && (i%2 === 0)){
			// picks.results[i]["timeline"]= "";
			picks.results[i]["picture"]= picks.results[i].multimedia.resource.src;
			console.log(picks.results[i]);
			var critic = ich.critic(picks.results[i]);
			$('#critic').append(critic);
		}else if('multimedia' in picks.results[i] ){
			picks.results[i]["timeline"]= "timeline-inverted";
			picks.results[i]["picture"]= picks.results[i].multimedia.resource.src;
			console.log(picks.results[i]);
			var critic = ich.critic(picks.results[i]);
			$('#critic').append(critic);
		}
	};
		

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

function callAjax(url) {
    $.ajax({
				'url': url,
				'type': 'GET',
				'dataType': "jsonp",
				success: function(data, textStats, XMLHttpRequest) {	
					return data;
				},
				error: function(data, textStatus, errorThrown) {
					console.log("error");
				}
			});
}
function sleep(miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
           }
       }

function imageLinkPrinter(imageLink){

	for(var i = 0; i < imageLink.results.length; i++){	
		var first_photo = imageLink.results[i];
		var temp=[];
	$.ajax({
		//'url': "https://api.themoviedb.org/3/search/movie/" + +"?api_key=d1d7ccec36948efe0fe4750abc77836f&query=" + searchQuery,
		'url': "http://api.themoviedb.org/3/movie/" + first_photo["id"] + "?api_key=d1d7ccec36948efe0fe4750abc77836f",
		'type': 'GET',
		'dataType': "json",
		success: function(data, textStats, XMLHttpRequest) {
			//temp.push(data);
			// console.log(temp);
			counter = (counter + 1)%5;
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
		first_photo["poster_path"]= "https://image.tmdb.org/t/p/original" + first_photo["poster_path"];
		// console.log(first_photo["overview"] = first_photo["overview"].split("."));
		first_photo["overview"] = first_photo["overview"].split(" ").slice(0,30).join(" ");
		first_photo["overview"] = first_photo["overview"] + ".... "
		first_photo["button"] = "<button class=\"btn-custom \" onclick=\"window.location.href='#test';\">Add to Watch List</button>"
		// first_photo[""]
		first_photo['title']=parseTitle(first_photo['title']);
		if(first_photo["tagline"]==""){
			first_photo["tagline"] = "Love is a friendship set to music";
		}
		first_photo["rating"] = parseVote(first_photo["vote_average"]);
		var images = ich.images(first_photo);
		$('#images').append(images);
		console.log(i);
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
		//console.log(imageLink.results[i]);
		//console.log(imageLink.results[i].backdrop_path);
	}





});

	