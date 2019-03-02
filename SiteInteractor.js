/*creates the instagram feed and allows other pages to retrieve the instaFeed*/
var userFeed;
function createInstaFeed(){
	var storedInstafeed=sessionStorage.getItem("instafeedHtml");
	if(storedInstafeed===null){
		userFeed = new Instafeed({
				get:'user',
				userId:'8587304815',		
				accessToken:'8587304815.9424bdb.b2a79c18531246bc868bc623d4b6dbc6',
				resolution:'standard_resolution',
				limit:6,
				template:
						'<div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 instagramImage">'+
						   	'<a href="{{link}}">'+
								'<span class="img-responsive" style=\' background-image:url("{{image}}") \'></span>'+
							'</a>'+
						'</div>',
				after: function() {
					sessionStorage.setItem("instafeedHtml",$("#instafeed").html());
				}
			});
		userFeed.run();	
	}else{
		$("#instafeed").html(storedInstafeed)
	}
}

$(document).ready(function(){
	/*action listening for the instagram title*/
	$("#footer-instagramHeader").click(function(){
		window.location="https://www.instagram.com/permanentroadtrip/";
	});
	$("#footer-instagramHeader").hover(function(){
		$("#footer-instagram-headerUnderline").toggleClass("footer-instagram-headerUnderline-active");
	});	
	
	
});



//Interactor with the navigation
$("document").ready(function(){
	var navBarHidden=true;
	//animates the navbar and the option div
	$("#headerSm-menuHolder").click(function(){
		if (navBarHidden){
			//animates the menu icon into an x
			document.getElementById("headerSm-menuHolder").classList.toggle("changedMenu");
			
			$("#headerSm-navSm").animate({left:0},200,function(){
				navBarHidden=false;
			});
			
			//changes text to done from menu

			
			//creates black tint on the screen
			$("#focusDiv").animate({opacity:0.9},200);
			$("#focusDiv").css("z-index",3);
			
			//disables the ability to scroll
			$("body").css("overflow","hidden");

			setTimeout(function(){$("#headerSm-menuLabel").text("Done");}, 100);
		}
	});
	
	//gets rid of the option div when the user clicks on something else
	$('body').click(function(event) {
		//if navBar is hidden and the click in not on the navBar
	    if (!navBarHidden && !$(event.target).closest('#headerSm-navSm').length) {
	    	navBarHidden=true;
	    	changeWindowToDefault(200);	    	
	    }
	});
	
	$(window).resize(function(){
		//if the navbar is open and the screen size is lg or md
		if(!navBarHidden && $(window).width()>=992){
			navBarHidden=true;
			changeWindowToDefault(0);
		}
	});
	//changes window back to normal after the animations for the navbar
	function changeWindowToDefault(animationTime){
		//animates the x icon into a menu icon
		document.getElementById("headerSm-menuHolder").classList.toggle("changedMenu");
		
		$("#headerSm-navSm").animate({left:-500},animationTime);

					
		//removes black tint on the screen
		$("#focusDiv").animate({opacity:0.0},animationTime,function(){$("#focusDiv").css("z-index",-100000);});
		//enables the ability to scroll
		$("body").css("overflow","scroll");
		
		setTimeout(function(){$("#headerSm-menuLabel").text("Menu");}, animationTime/2);
	}

//creates the accordion in the animation div of the sm and xs screen size
	$("#navSm-animationAccordion").accordion({
	    // Slide animation time
	    animate: 200,
	    // Starting tab
	    active: 0,
	    // Collapsible if same tab is clicked
	    collapsible: true,
	    // Event that triggers
	    event: "click",
	    // Height based on content
	    heightStyle: "content"
	  });
	
	$("#headerSm-logo").click(function(){
		window.location.replace("../Home/HomePage.html");
	});
	$("#headerLg-logo").click(function(){
		window.location.replace("../Home/HomePage.html");
	});
	function linkToHome(){
	}
	
	
	$("#headerSm-mapIcon").click(function(){
		window.location.replace("../Explore/Map.html");
	});
	$("#headerLg-mapIcon").click(function(){
		window.location.replace("../Explore/Map.html");
	});


	/*sets navbar fixed on scroll*/

	var menu = $('#headerLg-subNavigation');
	var origOffsetY = document.getElementById("headerLg-subNavigation").offsetTop;

	function scroll() {
		if ($(window).scrollTop()>=origOffsetY) {
			menu.addClass('stickyNavbar');
		}else {
			menu.removeClass('stickyNavbar');
	
		}
	}

	document.onscroll = scroll;
	    
});


/*slideshow interactor*/
var oldSlideIndex = 0;
var slideIndex = 0;
  
// Next/previous controls
function prevSlides() {
    animatePrevSlideshow(slideIndex -= 1);
}
function nextSlides() {
    animateNextSlideshow(slideIndex += 1);
}
        
// Thumbnail image controls
function currentSlide(n) {
            
    if(n<slideIndex){
        animateNextSlideshow(slideIndex=n);
    }else if(n>slideIndex){
        animatePrevSlideshow(slideIndex=n);
    }
}

function animatePrevSlideshow(n){
    var slides = document.getElementsByClassName("slideshow-slide");
    var dots = document.getElementsByClassName("slideshow-dot");
    if (n >= slides.length) {slideIndex = 0} 
    if (n < 0) {slideIndex = slides.length-1}

    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    $(dots[n]).addClass("active");
            
    $("body").css("overflow-x","hidden");
	var activeSlide=$(slides[oldSlideIndex]);
	var newActiveSlide=$(slides[slideIndex]);
	
	//animates activeSlide off of the screen as newActiveSlide is animated on
	activeSlide.animate({left:-$("body").width()},200);
	//animates newActiveSlide just to the left of the screen then makes newActiveSlide visible
	newActiveSlide.animate({left:"0px"},0);
	newActiveSlide.animate({left:$("body").width()},0, function(){
		newActiveSlide.css({"display":"inline-block", "position":"absolute"});
	});
	//animates newActiveSlide onto the screen
	newActiveSlide.animate({left:"0px"},300, function(){					
		$("body").css("overflow-x","scroll");
		newActiveSlide.css({"position":"relative"});
		activeSlide.css({"display":"none"});
	});
			
	oldSlideIndex=slideIndex;
}
function animateNextSlideshow(n){
    var slides = document.getElementsByClassName("slideshow-slide");
    var dots = document.getElementsByClassName("slideshow-dot");
    if (n >= slides.length) {slideIndex = 0} 
    if (n < 0) {slideIndex = slides.length}

    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }
    $(dots[n]).addClass("active");
            
    $("body").css("overflow-x","hidden");
	var activeSlide=$(slides[oldSlideIndex]);
	var newActiveSlide=$(slides[slideIndex]);
	
	//animates activeSlide off of the screen as newActiveSlide is animated on
	activeSlide.animate({left:$("body").width()},300);
    //animates newActiveSlide just to the left of the screen then makes newActiveSlide visible
	newActiveSlide.animate({left:"0px"},0);
	newActiveSlide.animate({left:-$("body").width()},0, function(){
	    newActiveSlide.css({"display":"block","position":"absolute"});
    });
			
	//animates newActiveSlide onto the screen
	newActiveSlide.animate({left:"0px"},300, function(){					
		$("body").css("overflow-x","scroll");
		newActiveSlide.css({"position":"relative"});
		activeSlide.css({"display":"none"});
	});
			
	oldSlideIndex=slideIndex;
}



function emailKeyListenerFooter(){
    var emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    var inputedEmail=$("#footerNewsletter-emailTextBar").val();
        
	if(emailRegExp.test(inputedEmail)){
		$("#footerNewsletter-responseMessage").text("");
	}
		
	var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        addToNewsletterFooter();
    }
}
//footer newsletter sign up
function addToNewsletterFooter(){
    var emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    $("#footerNewsletter-responseMessage").text("");
	var inputedEmail=$("#footerNewsletter-emailTextBar").val().toLowerCase();
	if(emailRegExp.test(inputedEmail)){
	    $.get("https://www.permanentroadtrip.com/SugarIsland/PostServer.php?command=insertNewsletter&email="+inputedEmail, function(data){
            if(data=="success"){
        		$("#footerNewsletter-responseMessage").text("Thank you for signing up for the newsletter: "+inputedEmail);
        		$("#footerNewsletter-responseMessage").removeClass("newsletter-errorMessage").addClass("newsletter-thankYouMessage");
        		$("#footerNewsletter-emailTextBar").val("");
            }else{
                $("#footerNewsletter-responseMessage").text("Their was a problem with the request.  Please contact Sugar Island to notify them of this problem.");
                $("#footerNewsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
            }
        });
	}else{
	    $("#footerNewsletter-responseMessage").text("The email you entered is invalid");
	    $("#footerNewsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
	}
}

