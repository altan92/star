$(document).ready(function(){

	// check if the watchlist already exists
	var watchString = localStorage.getItem("watchlist");
	var watchlist;
	if (watchString==null){
		//create a json object to store the user activity
		// indicating first time user
		//alert("Welcome")
		watchlist = {"movielist":[]};
		localStorage.setItem('watchlist', JSON.stringify(watchlist));
	}
	else{
		//indicate the user has visited the page before
		watchlist = JSON.parse(watchString);
		//populate the watchlist with already added movie
		var currentlist = watchlist.movielist;
		var name;
		var imgurl;
		for (var i = currentlist.length-1; i >= 0; i--) {
			name=currentlist[i].name
			imgurl=currentlist[i].imageurl
			$('.dropdown-menu').prepend(newMovieOnList(name,imgurl));
		};
	}

	$(document).on("click",".add-to-list",function(){
		var movie = this.id.split('@');
		var name = movie[0];
		var imageurl = movie[1];

		if(addMovie(watchlist,name,imageurl)){
			$('.dropdown-menu').prepend(newMovieOnList(name,imageurl));
		}

	});

	$(document).on("click",".fa-minus-circle",function(){
		var movie = this.id.split('@');
		var name = movie[0];
		console.log(name);
		removeMovie(watchlist,name);
		$(this).parents("a").remove();
	});

});

// adds movie to the watch list
function addMovie(watchlist,name, imageurl){

	if(!findMovie(watchlist,name)){
		var newmovie = {"name":name,"imageurl":imageurl};
		currentlist = watchlist.movielist;
		currentlist[currentlist.length] = newmovie;
		localStorage.setItem("watchlist", JSON.stringify(watchlist));
		return true;
	}
	return false;
}

// remove food from the list
function removeMovie(watchlist,name){

	var currentlist = watchlist.movielist;
	var newlist=[];

	for (var i =0; i<currentlist.length; i++){
		if(currentlist[i].name != name){
			newlist[newlist.length]=currentlist[i];
		}
	}
	watchlist.movielist = newlist;
	localStorage.setItem("watchlist", JSON.stringify(watchlist));

}

// returns true if the movie is found
function findMovie(watchlist,name){

	var currentlist = watchlist.movielist;

	for (var i=0; i<currentlist.length; i++){
		//movie found
		if (currentlist[i].name == name){
			return true;
		}
	}
	return false;
}

function newMovieOnList(name, imgurl){

	var inner = '<li>'+
				'<a>'+
                     '<div class= "menu-watch-list">'+
                     '<div class="menu-movie-img">'+
                        '<img src= "'+imgurl+'">'+
                      '</div>'+
                       '<div class="menu-movie-name">'+name+'</div>'+
                       '<div class="menu-remove-icon">'+
                        '<i class="fa fa-minus-circle"id="'+name+'@'+imgurl+'"></i></div>'+
                        '</div>'+
                 '</a>'+
                 '</li>'
    return inner;
}