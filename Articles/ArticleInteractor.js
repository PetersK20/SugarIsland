//MeetingMinuteInteractor ---------------------------------------------------------------------------------------------------
//meetingJson: meetingData=[date={},dateText=[], title=[], meetingContent={}, nextMeetingDate={}]
var meetingJson;
var currentMeeting=0;
var numberOfMeetings=meetingJson.meetingData.length-1;
//used to allow the event function to access this json
function getMeetingMinuteData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getMeetingMinuteData", function(data){
        meetingJson=JSON.parse(data);
        //so that the calendar event function can access the json
        sessionStorage.setItem("calendarEvents",JSON.stringify(meetingJson));
        createCalendar();
        setMeetingMinute();
        createInstaFeed();
    });
}
function createCalendar(){

	$('#calendar').fullCalendar({
		header:{
			left:'prev,next, today',
			center:'title',
			right:'month,agendaWeek,agendaDay'
		},
		events: function(start, end, timezone, callback, meetingJson) {
			var events = [];//'2014-05-01'
			var meetingJsonTemp=JSON.parse(sessionStorage.getItem("calendarEvents"));
			var jsonSize=meetingJsonTemp.meetingData.length;
			for(var x=0;x<jsonSize;x++){
				var moment = $.fullCalendar.moment(meetingJsonTemp.meetingData[x].date);
				var title = meetingJsonTemp.meetingData[x].title;
				events.push({
					id:x,
					size:jsonSize,
	                title: title,
	                start: moment,
	        		backgroundColor:"#57BC90",
	        		borderColor:"#57BC90"
	            });

			}
			callback(events);
		},
		eventClick: function(calEvent, jsEvent, view) {
			currentMeeting=calEvent.id;
			setMeetingMinute();
			
			$("#meetings-rightArrow.disabled").removeClass("disabled");
			$("#meetings-leftArrow.disabled").removeClass("disabled");
			
			if(calEvent.size-1<=currentMeeting){
				$("#meetings-leftArrow").addClass("disabled");
			}		
			if(currentMeeting<=0){
				$("#meetings-rightArrow").addClass("disabled");
			}
			$(window).scrollTop(450);
		},
		eventRender: function(event, element) {
			element.css({"cursor":"pointer","padding":"10px 0px 10px 10px","font-size":"15pt"});
		},
		editable:false
		
	});
}

function setMeetingMinute(){

	$("#currentMeetingMinute").html(meetingJson.meetingData[currentMeeting].dateText);
	$("#meetingMinuteHolder").html(
		'<div class="meetingMinute">'+
			'<p>'+meetingJson.meetingData[currentMeeting].meetingContent+'</p>'+
		'</div>'		
	);
}
function goToPrevMeeting(){
	if(numberOfMeetings<=currentMeeting){
		return;
	}
	
	currentMeeting=currentMeeting+1;
	setMeetingMinute();
	$("#meetings-rightArrow.disabled").removeClass("disabled");

	if(numberOfMeetings<=currentMeeting){
		$("#meetings-leftArrow").addClass("disabled");
	}
}
function goToNextMeeting(){
	if(currentMeeting<=0){
		return;
	}
	currentMeeting=currentMeeting-1;
	setMeetingMinute();
	$("#meetings-leftArrow.disabled").removeClass("disabled");
	
	if(currentMeeting<=0){
		$("#meetings-rightArrow").addClass("disabled");
	}
}



//NewsletterInteractor -------------------------------------------------------------------------------------------------
var emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);

/*validates email then sends it to the server*/
function validateEmail(){
    emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/); 
	var inputedEmail=$("#newsletter-emailTextBar").val();
	if(!emailRegExp.test(inputedEmail)){
		$("#newsletter-responseMessage").text("The email you entered is invalid");
		$("#newsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
	}
}
function emailKeyListener(){
    emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/); 
    var inputedEmail=$("#newsletter-emailTextBar").val();
        
	if(emailRegExp.test(inputedEmail)){
		$("#newsletter-responseMessage").text("");
	}
		
	var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        addToNewsletter();
    }
}

function addToNewsletter(){
    emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    $("#newsletter-responseMessage").text("");
	var inputedEmail=$("#newsletter-emailTextBar").val().toLowerCase();
	if(emailRegExp.test(inputedEmail)){
	    $.get("https://www.sugarislandhistory.com/webcontent/PostServer.php?command=insertNewsletter&email="+inputedEmail, function(data){
            if(data=="success"){
        		$("#newsletter-responseMessage").text("Thank you for signing up for the newsletter: "+inputedEmail);
        		$("#newsletter-responseMessage").removeClass("newsletter-errorMessage").addClass("newsletter-thankYouMessage");
        		$("#newsletter-emailTextBar").val("");
            }else{
                $("#newsletter-responseMessage").text("Their was a problem with the request.  Please contact Sugar Island to notify them of this problem.");
                $("#newsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
            }
        });
	}else{
	    $("#newsletter-responseMessage").text("The email you entered is invalid");
	    $("#newsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
	}
}

function removeFromNewsletter(){
    emailRegExp = new RegExp(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
    $("#newsletter-responseMessage").text("");
	var inputedEmail=$("#newsletter-emailTextBar").val().toLowerCase();
	if(emailRegExp.test(inputedEmail)){

	    $.get("https://www.sugarislandhistory.com/webcontent/PostServer.php?command=removeNewsletter&email="+inputedEmail, function(data){
            if(data=="success"){
        		$("#newsletter-responseMessage").text("We have removed your email: "+inputedEmail);
        		$("#newsletter-responseMessage").removeClass("newsletter-errorMessage").addClass("newsletter-thankYouMessage");
        		$("#newsletter-emailTextBar").val("");
            }else{
                $("#newsletter-responseMessage").text("Their was a problem with the request.  The email was not in our database.");
                $("#newsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
            }
        });
	}else{
	    $("#newsletter-responseMessage").text("The email you entered is invalid");
	    $("#newsletter-responseMessage").addClass("newsletter-errorMessage").removeClass("newsletter-thankYouMessage");
	}
}


//StoriesInteractor -------------------------------------------------------------------------------------------------------
//storyJson: storyData=[title={},imageHeader=[], description=[], subTitle={}, subParagraph={}, subImage={}]

var storyJson;
var currentMeeting=0;
var currentPage=1;
function getStoryData(textQuery){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=searchStories&keyword="+textQuery, function(data){
        storyJson=JSON.parse(data);
        currentPage=1;
        addStories(storyJson,0,10,textQuery);
	    displayStoryPagination(storyJson);
	    createInstaFeed();
    });
}
function submitQuery(){
    $("#storyHolder").html("");
    $(".storyPagination").html("");
    getStoryData($("#stories-searchBar").val());
}
$('#stories-searchBar').keypress(function(event){

	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
	    submitQuery();
	}

});
function addStories(json,start,end,keywords){
    var length=json.storyData.length
    if(length<end){
        end=length;
    }
	for(var x=start;x<end;x++){
	    var title=highlightKeywords(json.storyData[x].title,keywords);
	    var description=highlightKeywords(json.storyData[x].description,keywords);
		$("#storyHolder").append(
			'<li class="page-defaultMargin" onclick="goToStoryPage('+x+')">'+
				'<h2 class="color-green page-greenLink">'+title+'</h2>'+
				'<p>'+description+'</p>'+
			'</li>'
		);
	}
}
function highlightKeywords(text, keywords) {
	var wordsAry=text.split(" ");
	
	var returnText="";
	var keywordCheck=keywords.toLowerCase();
	for(x=0;x<wordsAry.length;x++) {
	    var textCheck=wordsAry[x].toLowerCase();
	    //checks if the keyword is in this particular index of the  
	    if(keywordCheck.indexOf(textCheck)!==-1 || textCheck.indexOf(keywordCheck)!==-1){
	        returnText+=" <span style='font-weight:bold;'>"+wordsAry[x]+"</span> ";
	        continue;
	    }
	    returnText+=" "+wordsAry[x];+" ";
	}
	return returnText;
}

//Redirects to the StoryPage-----------------------------------------------
function goToStoryPage(index){
	//BlogPage will use the sessionStorage to access the data needed to create the page
	sessionStorage.removeItem("storyData");
	var storyData={storyData:{}}; 
	storyData.storyData=storyJson.storyData[index];
	sessionStorage.setItem("storyData",JSON.stringify(storyData));
	window.location.href = "https://www.sugarislandhistory.com/webcontent/Articles/StoryPage.html";
}
//used by StoryPage to display the data in sessionStorage
function customizeStoryPage(){
	
	storyPageJson=JSON.parse(sessionStorage.getItem("storyData"));
	var storyName=storyPageJson.storyData.title;
	document.title=storyName;
	$("#storyTitle").text(storyName);
	$("#headerImg").css("background-image","url('"+storyPageJson.storyData.imageHeader+"')");

	$("#storyDescription").text(storyPageJson.storyData.description);
	createInstaFeed();
	addStoryInfo(storyPageJson);
}
//adds the info to the StoryPage
function addStoryInfo(storyPageJson){
    
	var subTitleArray=storyPageJson.storyData.subTitle.split("~");
	var subParagraphArray=storyPageJson.storyData.subParagraph.split("~");
	var subImageArray=storyPageJson.storyData.subImage.split("~");

	for(var x=0;x<subTitleArray.length;x++){
		$("#storyTextHolder").append("<div align='center'><h1>"+subTitleArray[x]+"</h1></div> <br>");
		$("#storyTextHolder").append("<div align='center'><p>"+subParagraphArray[x]+"</p></div>");
		if(subImageArray[x]!=="none"){		
			$("#storyTextHolder").append("<br><div align='center'> <img class='storySubImage' src='"+subImageArray[x]+"'></div>");
		}
		$("#storyTextHolder").append("<hr>");
	}
	
}
function storyPaginationClick(newCurrentPage){
	currentPage=newCurrentPage;

	$(".storyPagination").html("");
	$("#storyHolder").html("");
	
	$("html, body").animate({scrollTop: "450px"});
	displayContest(newCurrentPage*10-10,newCurrentPage*10);
}
//displays currentIndex, 2 indexes before/after, and prev/next
function displayStoryPagination(json){
	var numberOfPages=Math.ceil(json.storyData.length/10);
	if(numberOfPages===0){numberOfPages=1;}
	//following if statements prevent things from going wrong in the pagination like displaying the same number twice
	
	if(currentPage==1){//displays prev button but disables it if currentPage==numberOfPages
		$(".storyPagination").append(
			'<li id="pagination-next" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".storyPagination").append(
			'<li id="pagination-next" onclick="storyPaginationClick('+(currentPage-1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
	
	if(currentPage!==1){//displays 1
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick(1)"><a href="#!">'+1+'</a></li>'
		);
	}
	if(currentPage-2>=3){//adds ... because there is a number gap between 1 and the next number
		$(".storyPagination").append(
			'<li><a>...</a></li>'
		);
	}
	
	
	
	if(currentPage>3){//display 2 before current
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick('+(currentPage-2)+')"><a href="#!">'+(currentPage-2)+'</a></li>'
		);
	}
	if(currentPage>2){//display 1 before current
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick('+(currentPage-1)+')"><a href="#!">'+(currentPage-1)+'</a></li>'
		);
	}

	$(".storyPagination").append(//display current
		'<li class="active"><a>'+currentPage+'</a></li>'
	);

	if(currentPage<numberOfPages-1){//display 1 after current
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick('+(currentPage+1)+')"><a href="#!">'+(currentPage+1)+'</a></li>'
		);
	}
	if(currentPage<numberOfPages-2){//display 2 after current
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick('+(currentPage+2)+')"><a href="#!">'+(currentPage+2)+'</a></li>'
		);
	}
	
	
	if(currentPage+4<=numberOfPages){//adds ... because there is a number gap between the last index and the previous number
		$(".storyPagination").append(
			'<li><a>...</a></li>'
		);
	}	
	
	if(numberOfPages!==currentPage &&currentPage!==numberOfPages){//displays last page number
		$(".storyPagination").append(
			'<li onclick="storyPaginationClick('+numberOfPages+')"><a href="#!">'+numberOfPages+'</a></li>'
		);
	}
	
	if(currentPage==numberOfPages){//displays prev button but disables it if currentPage==numberOfPages
		$(".storyPagination").append(
			'<li id="pagination-prev" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".storyPagination").append(
			'<li id="pagination-prev" onclick="storyPaginationClick('+(currentPage+1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}

}