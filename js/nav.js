(function( window ){
	
	'use strict';

	var body = document.body,
		mask = document.createElement("div"),
		togglePushRight = document.querySelector( ".toggle-push-right" ),
		toggleFilter = document.querySelector( ".toggle-filter" ),
		activeNav
	;

	
	togglePushRight.addEventListener( "click", function(){
		classie.add( body, "pmr-open" );
		activeNav = "pmr-open";
	} );

	toggleFilter.addEventListener("click",function(){
     	var element = document.getElementById("filter");
		if(element.value == 'c') {
			window.location.href="index2.html";
		} else {
			window.location.href="index.html";
		}
	});

	

	/* hide active menu if close menu button is clicked */
	[].slice.call(document.querySelectorAll(".close-menu")).forEach(function(el,i){
		el.addEventListener( "click", function(){
			var activeNav = "pmr-open";
			classie.remove( body, activeNav );
			activeNav = "";
		} );
	});


})( window );