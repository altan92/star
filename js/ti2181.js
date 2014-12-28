////////////////////////////////////////////////////////////////////
// Lightbox
////////////////////////////////////////////////////////////////////
$('.lightbox').lightbox();
$('.lightbox').click(function() {
	$('html').addClass("open-lightbox");
	setTimeout(function() {
		$('html.open-lightbox').css("overflow", "hidden");
	},300);		
});

$('.jquery-lightbox-button-close').click(function() {
	$('html.open-lightbox').css("overflow-y", "scroll");
	setTimeout(function() {
		$('html').removeClass("open-lightbox");
	},300);	
});

