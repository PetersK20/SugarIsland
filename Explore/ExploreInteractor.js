//ProjectCreator -----------------------------------------------------------------------------------------------------------
//projectJson : projectData=[title={},description={},image={}, subTitles={}, subParagraphs={}, subImages={}, category={}, keywords={}]
var projectJson;
var projectJsonFiltered;
//gets the json from the server
function getProjectJson(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getHistoryProjectData", function(data){
        projectJson=JSON.parse(data);
        projectJsonFiltered=projectJson;
    	addProjects(0,20,projectJsonFiltered);
	    displayPaginationProject(projectJsonFiltered);
	    createInstaFeed();
    });
}
function addProjects(start, end, json){
    if(end>json.projectData.length){
        end=json.projectData.length;
    }
	for(var x=start;x<end;x++){
		$("#projectHolder>.row").append(
			'<div class="projectHolder col-lg-4 col-md-4 col-sm-6 col-xs-12" onclick="goToProjectPage('+x+');">'+
				'<div class="project" onmouseenter=projectEnter("project'+x+'"); onmouseleave=projectLeave("project'+x+'");>'+
				
					'<div id="project'+x+'">'+
					
						'<div class="project-img" style="background-image:url('+json.projectData[x].image+');"></div>'+
						'<div class="project-imgText">'+
							'<div class="project-imgTextBg"></div>'+
							'<h1>'+json.projectData[x].title+'</h1>'+
						'</div>'+
	
					'</div>'+
					
				'</div>'+
			'</div>'
		);
	}
}

//projectJson : projectData=[title={},description={},image={}, subTitles={}, subParagraphs={}, subImages={}, category={}, keywords={}]
function paginationClickProject(newCurrentPage){
	currentPage=newCurrentPage;

	$(".projectPagination").html("");
	$("#projectHolder>.row").html("");
	
	$("html, body").animate({scrollTop: "450px"});
	addProjects(newCurrentPage*20-20,newCurrentPage*20,projectJsonFiltered);
	displayPaginationProject(projectJsonFiltered);
		
}
//displays currentIndex, 2 indexes before/after, and prev/next
var currentPage=1;
function displayPaginationProject(json){
	var numberOfPages=Math.ceil(json.projectData.length/20);
	if(numberOfPages===0){numberOfPages=1;}

	//following if statements prevent things from going wrong in the pagination like displaying the same number twice
	
	
	if(currentPage==1){//displays prev button but disables it if currentPage==numberOfPages
		$(".projectPagination").append(
			'<li id="pagination-next" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".projectPagination").append(
			'<li id="pagination-next" onclick="paginationClickActivity('+(currentPage-1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
	
	if(currentPage!==1){//displays 1
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity(1)"><a href="#!">'+1+'</a></li>'
		);
	}
	if(currentPage-2>=3){//adds ... because there is a number gap between 1 and the next number
		$(".projectPagination").append(
			'<li><a>...</a></li>'
		);
	}
	
	
	
	if(currentPage>3){//display 2 before current
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity('+(currentPage-2)+')"><a href="#!">'+(currentPage-2)+'</a></li>'
		);
	}
	if(currentPage>2){//display 1 before current
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity('+(currentPage-1)+')"><a href="#!">'+(currentPage-1)+'</a></li>'
		);
	}

	$(".projectPagination").append(//display current
		'<li class="active"><a>'+currentPage+'</a></li>'
	);

	if(currentPage<numberOfPages-1){//display 1 after current
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity('+(currentPage+1)+')"><a href="#!">'+(currentPage+1)+'</a></li>'
		);
	}
	if(currentPage<numberOfPages-2){//display 2 after current
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity('+(currentPage+2)+')"><a href="#!">'+(currentPage+2)+'</a></li>'
		);
	}
	
	
	if(currentPage+4<=numberOfPages){//adds ... because there is a number gap between the last index and the previous number
		$(".projectPagination").append(
			'<li><a>...</a></li>'
		);
	}	
	
	if(numberOfPages!==currentPage &&currentPage!==numberOfPages){//displays last page number
		$(".projectPagination").append(
			'<li onclick="paginationClickActivity('+numberOfPages+')"><a href="#!">'+numberOfPages+'</a></li>'
		);
	}
	
	if(currentPage==numberOfPages){//displays prev button but disables it if currentPage==numberOfPages
		$(".projectPagination").append(
			'<li id="pagination-prev" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".projectPagination").append(
			'<li id="pagination-prev" onclick="paginationClickActivity('+(currentPage+1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
}



//when user hovers over a project
function projectEnter(projectId){
	//fades out the banner over the image with the state name
	$("#"+projectId+">.project-imgText").stop().fadeOut(300);

}
//when user exits after hovering over a project
function projectLeave(projectId){
	//fades in the banner over the image with the state name
	$("#"+projectId+">.project-imgText").stop().fadeIn(300);
}




//filters the json for the projects----------------------------------
$(document).ready(function(){
	$("#projectSearchButton").click(function(){
		filterProjects();
	});
	$("#projectSearchTextbar").keyup(function (e) {
	    if (e.keyCode == 13) {
	        filterProjects();
	    }
	});
	function filterProjects(){
		var json = filterProjectJson($('#project-categorySelect option:selected'),$("#projectSearchTextbar").val().toLowerCase());
		projectJsonFiltered=json;
		paginationClickProject(1)
	}
	
});


function filterProjectJson(categorySelected,textQuery){
    //projectJson : projectData=[title={},description={},image={}, subTitles={}, subParagraphs={}, subImages={}, category={}]
    var filteredJson = {
			projectData: []
	};
		
	//checks if the selected states are included on the markers then adds the markers to the filteredJson if so
	//then checks if they are related to the search bar then sends the json so the map can be updated
	if(categorySelected.length!==0 && categorySelected.length!==3){
		for(var x=0;x<projectJson.projectData.length;x++){
				
			for(var y=0; y<categorySelected.length;y++){
					
				if(projectJson.projectData[x].category.toLowerCase() === $(categorySelected[y]).text().toLowerCase()){
					filteredJson.projectData.push(projectJson.projectData[x]);		
				}
			}
		}
	}else{
			
		filteredJson=projectJson;
			
	}
	
	
	//goes through the first filteredJson's keywords and the searchQueryString. 
	//As long as one of the searchQueryString words is in the keywords, the marker shows up
	var projectJson2 = {
			projectData: []
	};
	var searchQueryArray=textQuery.split(" ");
	if(textQuery!==""){
		for(var x=0;x<filteredJson.projectData.length;x++){
				
			var keywords=(filteredJson.projectData[x].keywords).toLowerCase();
				
			for(var y=0;y<searchQueryArray.length;y++){
					
				if(keywords.indexOf(searchQueryArray[y])!==-1){
					projectJson2.projectData.push(filteredJson.projectData[x]);	
					break;
				}
					
			}
		}
	}else{
		return filteredJson;
	}
	
	return projectJson2;
}







//projectJson : projectData=[title={},description={},image={}, subTitles={}, subParagraphs={}, subImages={}, category={}, keywords={}]
//Redirects to the project Page---------------------------------------------------------------------------------------------------------
function goToProjectPage(index){
	//projectPage will use the sessionStorage to access the data needed to create the page
	sessionStorage.removeItem("projectData");
	var projectData={projectPageData:{}}; 
	projectData.projectPageData=projectJson.projectData[index];
	sessionStorage.setItem("projectData",JSON.stringify(projectData));
	window.location.href = "https://www.sugarislandhistory.com/webcontent/Explore/Project.html";
}
//called from the project.html page
function customizeProjectPage(){
	var projectJson=JSON.parse(sessionStorage.getItem("projectData"));
	var projectName=projectJson.projectPageData.title;
	document.title=projectName;
	$("#headerImg h1").text(projectName);
	$("#headerImg").css("background-image","url('"+projectJson.projectPageData.image+"')");
	createInstaFeed();
	addProjectInfo(projectJson);
}
//add info to the projects page
function addProjectInfo(projectJson){
	var subTitleArray=projectJson.projectPageData.subTitle.split("~");
	var subParagraphArray=projectJson.projectPageData.subParagraph.split("~");
	var subImageArray=projectJson.projectPageData.subImage.split("~");

	for(var x=0;x<subTitleArray.length;x++){
		$("#projectTextHolder").append("<div align='center'><h1>"+subTitleArray[x]+"</h1></div> <br>");
		$("#projectTextHolder").append("<div align='center'><p>"+subParagraphArray[x]+"</p></div>");
		if(subImageArray[x]!=="none"){		
			$("#projectTextHolder").append("<br><div align='center'><img class='projectSubImage' src='"+subImageArray[x]+"'></div>");
		}
		$("#projectTextHolder").append("<hr>");
	}
}










//Do you know contest Interactor --------------------------------------------------------------------------------
//doYouKnowJson={doYouKnowData:[image:{},question:{},emailAddress:{}]}
var doYouKnowJson;
function getDoYouKnowData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getDoYouKnowData", function(data){
        doYouKnowJson=JSON.parse(data);
        displayContest(0,7);
        displayPaginationContest(doYouKnowJson);
        createInstaFeed();
    });
}
function displayContest(startNumber,endNumber){
	
	var jsonLength=doYouKnowJson.doYouKnowData.length;
	if(jsonLength<endNumber){
		endNumber=jsonLength;
	}
	for(var x=startNumber;x<endNumber;x++){
		$("#contestHolder").append(
			'<div id="contestNode'+x+'" class="contestNode">'+
				'<img width="100%" src="'+doYouKnowJson.doYouKnowData[x].image+'">'+
			'</div>'
		);
		var questionArray=doYouKnowJson.doYouKnowData[x].question.split("~");
		for(var y=0;y<questionArray.length;y++){
			$("#contestHolder>#contestNode"+x).append(
				'<h1 class="color-green">'+questionArray[y]+'</h1>'+
				'<div class="input-group input-group-lg">'+
				 	'<input type="text" class="form-control" disabled="disabled" style="cursor:default">'+
				'</div>'
			);
		}
		$("#contestHolder>#contestNode"+x).append(
			'<br><Button class="btn btn-lg btn-green" onclick="showAnswers(this,'+x+')" style="width:154px">Show Answers</Button><hr><br><br>'
		);
		
		
	}

}
function showAnswers(buttonClicked,contestNodeNum){
    //if button has text = show answers then show the answers else hide the answers
    if($(buttonClicked).text()=="Show Answers"){
        $(buttonClicked).text("Hide Answers");
        answers=doYouKnowJson.doYouKnowData[contestNodeNum].answer.split("~");
        textBoxes=$("#contestHolder>#contestNode"+contestNodeNum+" .form-control");
        var y=0;
        textBoxes.each(function(){
            $(this).val(answers[y]);
            y++;
        });
    }else{
        $(buttonClicked).text("Show Answers");
        textBoxes=$("#contestHolder>#contestNode"+contestNodeNum+" .form-control").val("");
    }
    
}


function paginationClickContest(newCurrentPage){
	currentPage=newCurrentPage;

	$(".contestPagination").html("");
	$("#contestHolder").html("");
	
	displayContest(newCurrentPage*7-7,newCurrentPage*7);
	$("html, body").animate({scrollTop: "450px"});
}

//displays currentIndex, 2 indexes before/after, and prev/next
var currentPage=1;
function displayPaginationContest(json){
	var numberOfPages=Math.ceil(json.doYouKnowData.length/7);
	if(numberOfPages==0){numberOfPages=1;}

	//following if statements prevent things from going wrong in the pagination like displaying the same number twice
	
	if(currentPage==1){//displays prev button but disables it if currentPage==numberOfPages
		$(".contestPagination").append(
			'<li id="pagination-next" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".contestPagination").append(
			'<li id="pagination-next" onclick="paginationClickContest('+(currentPage-1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
	
	if(currentPage!==1){//displays 1
		$(".contestPagination").append(
			'<li onclick="paginationClickContest(1)"><a href="#!">'+1+'</a></li>'
		);
	}
	if(currentPage-2>=3){//adds ... because there is a number gap between 1 and the next number
		$(".contestPagination").append(
			'<li><a>...</a></li>'
		);
	}
	
	
	
	if(currentPage>3){//display 2 before current
		$(".contestPagination").append(
			'<li onclick=paginationClickContest('+(currentPage-2)+')"><a href="#!">'+(currentPage-2)+'</a></li>'
		);
	}
	if(currentPage>2){//display 1 before current
		$(".contestPagination").append(
			'<li onclick="paginationClickContest('+(currentPage-1)+')"><a href="#!">'+(currentPage-1)+'</a></li>'
		);
	}

	$(".contestPagination").append(//display current
		'<li class="active"><a>'+currentPage+'</a></li>'
	);

	if(currentPage<numberOfPages-1){//display 1 after current
		$(".contestPagination").append(
			'<li onclick="paginationClickContest('+(currentPage+1)+')"><a href="#!">'+(currentPage+1)+'</a></li>'
		);
	}
	if(currentPage<numberOfPages-2){//display 2 after current
		$(".contestPagination").append(
			'<li onclick="paginationClickContest('+(currentPage+2)+')"><a href="#!">'+(currentPage+2)+'</a></li>'
		);
	}
	
	
	if(currentPage+4<=numberOfPages){//adds ... because there is a number gap between the last index and the previous number
		$(".contestPagination").append(
			'<li><a>...</a></li>'
		);
	}	
	
	if(numberOfPages!==currentPage &&currentPage!==numberOfPages){//displays last page number
		$(".contestPagination").append(
			'<li onclick="paginationClickContest('+numberOfPages+')"><a href="#!">'+numberOfPages+'</a></li>'
		);
	}
	
	if(currentPage==numberOfPages){//displays prev button but disables it if currentPage==numberOfPages
		$(".contestPagination").append(
			'<li id="pagination-prev" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".contestPagination").append(
			'<li id="pagination-prev" onclick="paginationClickContest('+(currentPage+1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
}




//Map Interactor-------------------------------------------------------------------------------------------------------------------------
//mapJson: mapData=[title={},image=[], description=[], latitude={}, longitude={},keywords={},address={}]
var mapJson;
var map;
var popupHidden=true;
var allMarkers=[];
//MapCreator
function getMapData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getMapData", function(data){
        mapJson=JSON.parse(data);
        createSugarIslandMap();
	    addSugarIslandMarkers(mapJson);
	    addSugarIslandLocations(mapJson,0,19);
	    displayPaginationMap(mapJson);
	    createInstaFeed();
    });
}
function createSugarIslandMap() {
	var mapHolder = document.getElementById("mapHolder");
	var mapOptions = {
		center: new google.maps.LatLng(46.422979, -84.203339),
		zoom: 10
	};
	map = new google.maps.Map(mapHolder, mapOptions);
}
function addSugarIslandMarkers(json){
    var infoWindow = new google.maps.InfoWindow();
	for(var x=0;x<json.mapData.length;x++){
		  var marker = new google.maps.Marker({
			  position:new google.maps.LatLng(json.mapData[x].latitude,json.mapData[x].longitude),
			  index:x,
			  lat:json.mapData[x].latitude,
			  lng:json.mapData[x].longitude,
			  title:json.mapData[x].title,
			  image:json.mapData[x].image
		  });
		  allMarkers.push(marker);

		  marker.setMap(map);
							  
		  google.maps.event.addListener(marker,'click',function(){
			createPopupMenu(this.index);
		  });
		  google.maps.event.addDomListener(window, "resize", function() {
              var center = map.getCenter();
              google.maps.event.trigger(map, "resize");
              map.setCenter(center); 
          });
	}
}

//creates popup when map marker is clicked--------------------------------------
function createPopupMenu(index){
	$("body").css("overflow","hidden");
	$("#map-modal").css("display","block");

	//resets carousel then recreates it
	$("#carouselSlideList").html("");
	$("#carouselSlides").html("");
	addCarouselData(index);
	$("#map-modal-caption").html("Address: "+ mapJson.mapData[index].address + "<br>" + nl2br(mapJson.mapData[index].description)+"<br><br><br><br><br><br><br>");

    $("#map-modal-title").text(mapJson.mapData[index].title);
     
	 $("#map-modal-close").click(function() { 
		 $("#map-modal").css("display","none");
		 $("body").css("overflow","scroll");
	});
	
	

}
//creates line breaks for html from DB line breaks
function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
//adds the slides to the carousel
function addCarouselData(index){
    
    var imageArray = mapJson.mapData[index].image.split("~");//splits images up that are divided by ~ in the db
    
	//tells bootstraps the number of slides in the carousel
	for(var y=0;y<imageArray.length;y++){

		//if y==0 then set it as the active slide
		if(y==0){
			$("#carouselSlideList").append("<li data-target='#theCarousel' data-slide-to='"+y+"' class='active'> </li >");
		}else{
			$("#carouselSlideList").append("<li data-target='#theCarousel' data-slide-to='"+y+"'> </li >");
		}
	}
		
	//enters the data for the slides
	for(var y=0;y<imageArray.length;y++){
    
		//if y==0 then set it as the active slide
		if(y==0){
			$("#carouselSlides").append(
				"<div class='item active' style='background-image:url("+imageArray[y]+");'>"+
				"</div>"
			);
		}else{
			$("#carouselSlides").append(
				"<div class='item' style='background-image:url("+imageArray[y]+");'>"+
				"</div>"
			);
		}		
	}
}


//MapLocationCreator

function addSugarIslandLocations(json,startNumber,endNumber){
    
	if(json.mapData.length<endNumber){
		endNumber=json.mapData.length;
	}

	for(var x=startNumber;x<endNumber;x++){
        var image = mapJson.mapData[x].image.split("~")[0];
		$("#locationHolder").append(
			'<div class="locationHolder col-lg-3 col-md-4 col-sm-6 col-xs-12">'+
				'<div class="location" onmouseenter="byLocationEnter('+x+');" onmouseleave="byLocationLeave('+x+');">'+
				
					'<div id="location'+x+'">'+
					
						'<div class="location-img" style="background-image:url('+image+');"></div>'+
						'<div class="location-centeredImgText">'+
							'<div class="location-centeredImgTextBg"></div>'+
							'<h1>'+json.mapData[x].title+'</h1>'+
						'</div>'+
						
						'<div class="location-buttonHolder">'+
							'<Button class="btn btn-lg" onclick="createPopupMenu('+x+');">Find out More</Button>'+
							'<Button class="btn btn-lg" onclick="findOnMap('+x+');">Find on Map</Button>'+
						'</div>'+
						
					'</div>'+
					
				'</div>'+
			'</div>'
		);

	}
}

//when user hovers over a locationLink
function byLocationEnter(index){
	

	$("#location"+index+">div>.location-centeredImgTextBg").css("opacity","0");

	$("#location"+index+">.location-centeredImgText").stop().animate({"top":$("#location"+index).height()/2-50+"px"},300);
	
	$("#location"+index+">.location-buttonHolder").css("display","block");
	$("#location"+index+">.location-buttonHolder").stop().animate({"top":"60%","opacity":"1"},300);
	


}
//when user exits after hovering over a locationLink
function byLocationLeave(index){

	$("#location"+index+">div>.location-centeredImgTextBg").css("opacity",".5");
	
	$("#location"+index+">.location-centeredImgText").stop().animate({"top":"50%"},300);
	
	$("#location"+index+">.location-buttonHolder").stop().animate({"top":"100%","opacity":"0"},300);

}
//top function in this file is called if user presses findOutMore button
//when user clicks findOnMap button
function findOnMap(index){
	//allMarkers contain all map markers and is created in MapCreator.js
	var marker=allMarkers[index];
	map.setCenter(new google.maps.LatLng(marker.lat, marker.lng));
	map.setZoom(12); 
	$("html, body").animate({scrollTop: "500px"});

}



//filters the json for the map and locations----------------------------------
$(document).ready(function(){
	$("#mapSearchButton").click(function(){
		filterMarkers();
	});
	$("#mapSearchTextbar").keyup(function (e) {
	    if (e.keyCode == 13) {
	        filterMarkers();
	    }
	});
	function filterMarkers(){
		for(var x=0;x<allMarkers.length;x++){			
			allMarkers[x].setMap(null);
		}
		var json=filterJson($("#mapSearchTextbar").val().toLowerCase());
		addSugarIslandMarkers(json);
	    
	}
	
	$("#byLocation-searchButton").click(function(){
	    filterLocations();
	});
	$("#byLocation-searchTextbar").keyup(function (e) {
	    if(e.keyCode == 13){
			filterLocations();
	    }
	});
	function filterLocations(){
		$("#locationHolder").html("");
		$(".mapPagination").html("");
		
		var json=filterJson($("#byLocation-searchTextbar").val().toLowerCase());
		addSugarIslandLocations(json,0,19);
		displayPaginationMap(json);
	}
});
function filterJson(textQuery){
	//goes through the first filteredJson's keywords and the searchQueryString. 
	//As long as one of the searchQueryString words is in the keywords, the marker shows up
	var filteredJson = {
				mapData: []
	};
	if(textQuery!==""){
    	var searchQueryArray=textQuery.split(" ");
	    for(var x=0;x<mapJson.mapData.length;x++){
			var keywords=(mapJson.mapData[x].keywords).toLowerCase();
			for(var y=0;y<searchQueryArray.length;y++){
				if(keywords.indexOf(searchQueryArray[y])!==-1){
					filteredJson.mapData.push(mapJson.mapData[x]);
					break;
				}
					
			}
		}
	}else{
		return mapJson;
	}
		
	return filteredJson;
		
}
	
	



//MapPaginationDisplayer
//mapJson: mapData=[title={},image=[], description=[], latitude={}, longitude={},keywords={},address={}]]

function paginationClickMap(newCurrentPage){
	currentPage=newCurrentPage;

	$(".mapPagination").html("");
	$("#byLocation").html("");
	
	$("html, body").animate({scrollTop: "450px"});
	addLocations(newCurrentPage*20-20,newCurrentPage*20,mapJson);
	displayPaginationMap(mapJson);
}
//displays currentIndex, 2 indexes before/after, and prev/next
var currentPage=1;
function displayPaginationMap(json){
	var numberOfPages=Math.ceil(json.mapData.length/20);
	if(numberOfPages==0){numberOfPages=1;}

	//following if statements prevent things from going wrong in the pagination like displaying the same number twice
	
	
	if(currentPage==1){//displays prev button but disables it if currentPage==numberOfPages
		$(".mapPagination").append(
			'<li id="pagination-next" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".mapPagination").append(
			'<li id="pagination-next" onclick="paginationClickMap('+(currentPage-1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
	
	if(currentPage!==1){//displays 1
		$(".mapPagination").append(
			'<li onclick="paginationClickMap(1)"><a href="#!">'+1+'</a></li>'
		);
	}
	if(currentPage-2>=3){//adds ... because there is a number gap between 1 and the next number
		$(".mapPagination").append(
			'<li><a>...</a></li>'
		);
	}
	
	
	
	if(currentPage>3){//display 2 before current
		$(".mapPagination").append(
			'<li onclick="paginationClickMap('+(currentPage-2)+')"><a href="#!">'+(currentPage-2)+'</a></li>'
		);
	}
	if(currentPage>2){//display 1 before current
		$(".mapPagination").append(
			'<li onclick="paginationClickMap('+(currentPage-1)+')"><a href="#!">'+(currentPage-1)+'</a></li>'
		);
	}

	$(".mapPagination").append(//display current
		'<li class="active"><a>'+currentPage+'</a></li>'
	);

	if(currentPage<numberOfPages-1){//display 1 after current
		$(".mapPagination").append(
			'<li onclick="paginationClickMap('+(currentPage+1)+')"><a href="#!">'+(currentPage+1)+'</a></li>'
		);
	}
	if(currentPage<numberOfPages-2){//display 2 after current
		$(".mapPagination").append(
			'<li onclick="paginationClickMap('+(currentPage+2)+')"><a href="#!">'+(currentPage+2)+'</a></li>'
		);
	}
	
	
	if(currentPage+4<=numberOfPages){//adds ... because there is a number gap between the last index and the previous number
		$(".mapPagination").append(
			'<li><a>...</a></li>'
		);
	}	
	
	if(numberOfPages!==currentPage &&currentPage!==numberOfPages){//displays last page number
		$(".mapPagination").append(
			'<li onclick="paginationClickMap('+numberOfPages+')"><a href="#!">'+numberOfPages+'</a></li>'
		);
	}
	
	if(currentPage==numberOfPages){//displays prev button but disables it if currentPage==numberOfPages
		$(".mapPagination").append(
			'<li id="pagination-prev" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".mapPagination").append(
			'<li id="pagination-prev" onclick="paginationClickMap('+(currentPage+1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}

}

//















//PlacesToStayInteractor--------------------------------------------------------------------------------------------------------------
//var stayPlaceJson ={stayPlaceData : [{latitude:{}}, longitude:{}, name:{}, type:{}, image:{}}, description:{}, phone:{}, address:{}}, cost:{}]} 


var stayPlaceJson;
var numberOfPlaces;
var map;
var allMarkers=[];
function getPlacesToStay(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getPlacesToStay", function(data){
        stayPlaceJson=JSON.parse(data);
    	createStayMap(stayPlaceJson);
	    addPlacesToStay(stayPlaceJson,0,10);
	    createInstaFeed();
    });
}
function createStayMap(json) {
	var mapHolder = document.getElementById("mapHolder");
	var mapOptions = {
		center: new google.maps.LatLng(46.472967, -84.208731),
		zoom: 11
	};
	map = new google.maps.Map(mapHolder, mapOptions);
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center); 
        if($(document).width()<=500){
            map.setZoom(10);
        }else{
            map.setZoom(11);
        }
    });
	addMarkers(json);
}
var infoWindow = new google.maps.InfoWindow();
function addMarkers(json){

	for(var x=0;x<json.stayPlaceData.length;x++){
		var name=json.stayPlaceData[x].name;
		var address=json.stayPlaceData[x].address;
		var phone=json.stayPlaceData[x].phone;
		var image=json.stayPlaceData[x].image;
		var marker = new google.maps.Marker({
			position:new google.maps.LatLng(json.stayPlaceData[x].latitude,json.stayPlaceData[x].longitude),
			index:x,
			name:name,
			address:address,
			phone:phone,
			image:image
		});
		marker.setMap(map);
		allMarkers.push(marker);
		
		
		marker.addListener('click', function() {
			
			var contentString="<p><strong>"+this.name+"</strong></p>"+"<p>"+this.address+"</p>"+"<p>"+this.phone+"</p>"+
							  "<div class='mapImage' style='background-image:url("+this.image+");'></div><br>"+
			                  "<button class='btn btn-md btn-green' onclick='goToPlacePage("+this.index+");'>Learn More</button></div>";
			infoWindow.setContent(contentString);
			
			infoWindow.open(map, this);
		
		});

	}
}

//adds locations to stay
function addPlacesToStay(json,startNumber,endNumber){
	numberOfPlaces=json.stayPlaceData.length;
	
	if(numberOfPlaces<endNumber){
		endNumber=numberOfPlaces;
	}
	for(var x=startNumber;x<endNumber;x++){

		var name=json.stayPlaceData[x].name;
		var type=json.stayPlaceData[x].type;
		var description=json.stayPlaceData[x].description;
		var phone=json.stayPlaceData[x].phone;
		var address=json.stayPlaceData[x].address;
		var image=json.stayPlaceData[x].image;
		
		var descriptionSnippet=description.substring(0,200)+"...";
		$("#placesHolder").append(	
			'<div class="col-xs-12 col-sm-6 col-md-4">'+
				'<div class="card">'+
					'<div class="card-img" style="background-image:url('+image+')"></div>'+
					'<h1>'+name+'</h1>'+
					'<p>'+phone+'</p>'+
					'<p>'+address+'</p>'+
					'<p>'+
						'<button class="card-button" onclick="goToPlacePage('+x+')">Learn More</button'+
					'</p>'+
				'</div>'+
			'</div>'
		);

	}
	displayPaginationStay(json);
}
//filters places to stay based on the categories
var activeCategory=$("#all");
function filterPlacesToStay(selectedCategory){
	
	$(activeCategory).removeClass("active");
	$(selectedCategory).addClass("active");
	activeCategory=selectedCategory;
	
	var type=$(selectedCategory).attr("id");

	
	currentPage=1;
	$(".stayPlacesPagination").html("");
	$("#placesHolder").html("");
	
	var filteredJson = {
		stayPlaceData: []
	};
	
	if(type=="all"){
		addPlacesToStay(stayPlaceJson,currentPage*10-10,currentPage*10);
	}else{	
		for(var x=0;x<stayPlaceJson.stayPlaceData.length;x++){
			if(type==stayPlaceJson.stayPlaceData[x].type){
				filteredJson.stayPlaceData.push(stayPlaceJson.stayPlaceData[x]);
			}
		}
		addPlacesToStay(filteredJson,currentPage*10-10,currentPage*10);
	}
}
//pagination click listener
function paginationClickStay(newCurrentPage){
	currentPage=newCurrentPage;

	$(".stayPlacesPagination").html("");
	$("#placesHolder").html("");
	
	addPlacesToStay(stayPlaceJson,currentPage*10-10,currentPage*10);
	$("html, body").animate({scrollTop: "950px"});
}

//displays currentIndex, 2 indexes before/after, and prev/next
var currentPage=1;
function displayPaginationStay(json){
	var numberOfPages=Math.ceil(json.stayPlaceData.length/10);
	if(numberOfPages==0){numberOfPages=1;}

	//following if statements prevent things from going wrong in the pagination like displaying the same number twice
	
	if(currentPage==1){//displays prev button but disables it if currentPage==numberOfPages
		$(".stayPlacesPagination").append(
			'<li id="pagination-next" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".stayPlacesPagination").append(
			'<li id="pagination-next" onclick="paginationClickStay('+(currentPage-1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&laquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
	
	if(currentPage!==1){//displays 1
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay(1)"><a href="#!">'+1+'</a></li>'
		);
	}
	if(currentPage-2>=3){//adds ... because there is a number gap between 1 and the next number
		$(".stayPlacesPagination").append(
			'<li><a>...</a></li>'
		);
	}
	
	
	
	if(currentPage>3){//display 2 before current
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay('+(currentPage-2)+')"><a href="#!">'+(currentPage-2)+'</a></li>'
		);
	}
	if(currentPage>2){//display 1 before current
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay('+(currentPage-1)+')"><a href="#!">'+(currentPage-1)+'</a></li>'
		);
	}

	$(".stayPlacesPagination").append(//display current
		'<li class="active"><a>'+currentPage+'</a></li>'
	);

	if(currentPage<numberOfPages-1){//display 1 after current
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay('+(currentPage+1)+')"><a href="#!">'+(currentPage+1)+'</a></li>'
		);
	}
	if(currentPage<numberOfPages-2){//display 2 after current
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay('+(currentPage+2)+')"><a href="#!">'+(currentPage+2)+'</a></li>'
		);
	}
	
	
	if(currentPage+4<=numberOfPages){//adds ... because there is a number gap between the last index and the previous number
		$(".stayPlacesPagination").append(
			'<li><a>...</a></li>'
		);
	}	
	
	if(numberOfPages!==currentPage &&currentPage!==numberOfPages){//displays last page number
		$(".stayPlacesPagination").append(
			'<li onclick="paginationClickStay('+numberOfPages+')"><a href="#!">'+numberOfPages+'</a></li>'
		);
	}
	
	if(currentPage==numberOfPages){//displays prev button but disables it if currentPage==numberOfPages
		$(".stayPlacesPagination").append(
			'<li id="pagination-prev" class="disabled">'+
				'<a aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}else{
		$(".stayPlacesPagination").append(
			'<li id="pagination-prev" onclick="paginationClickStay('+(currentPage+1)+')">'+
				'<a href="#!" aria-label="Next">'+
					'<span aria-hidden="true">&raquo;</span>'+
				'</a>'+
			'</li>'
		);
	}
}
//creates the individual place to stay
//Redirects to the place Page-----------------------------------------------
function goToPlacePage(index){
	//PlacePage will use the sessionStorage to access the data needed to create the page
	sessionStorage.removeItem("stayPlaceData");
	var placeData={stayPlaceData:{}}; 
	placeData.stayPlaceData=stayPlaceJson.stayPlaceData[index];
	sessionStorage.setItem("stayPlaceData",JSON.stringify(placeData));
	window.location.href = "https://www.sugarislandhistory.com/webcontent/Explore/Place.html";
}
//var stayPlaceJson ={stayPlaceData : [{latitude:{}}, longitude:{}, name:{}, type:{}, image:{}}, description:{}, phone:{}, address:{}}, cost:{}]} 


//called from the place.html page
function customizePlacePage(){
	var placePageJson=JSON.parse(sessionStorage.getItem("stayPlaceData"));
	var placeName=placePageJson.stayPlaceData.name;
	document.title=placeName;
	$("#headerImg h1").text(placeName);
	$("#headerImg").css("background-image","url('"+placePageJson.stayPlaceData.image+"')");
	createInstaFeed();
	addPlaceInfo(placePageJson);
}

function addPlaceInfo(placePageJson){
	
	var latitude=placePageJson.stayPlaceData.latitude;
	var longitude=placePageJson.stayPlaceData.longitude;
    var mapHolder = document.getElementById("mapHolder");
	var mapOptions = {
		center: new google.maps.LatLng(46.422979, -84.203339),
		zoom: 10
	};
	map = new google.maps.Map(mapHolder, mapOptions);
    var marker = new google.maps.Marker({
		position:new google.maps.LatLng(latitude,longitude),
		map:map
	});
	
	var description=placePageJson.stayPlaceData.description;
	var phone=placePageJson.stayPlaceData.phone;
	var address=placePageJson.stayPlaceData.address;
	var name=placePageJson.stayPlaceData.name;
	$("#placeInfoHolder").append(
	    '<h1 class="color-green"><strong>'+name+'</strong></h1>'+
	    '<h3><strong>'+address+'</strong></h3>'+
	    '<h3>Phone: '+phone+'</h3>'+
	    '<h3>Description</h3>'+
	    '<p>'+description+'</p>'
	);
	
}




//Upcoming Events Interactor
//eventsJson: eventsData=[startTime={},endTime={}, title={}, description={}, image={}, latitude={}, longitude={}, address={}, keywords={}]
var eventsJson;

function getThingsToDoData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getThingsToDo", function(data){
        eventsJson=JSON.parse(data);
        //used to allow the event function(with calendar below) to access this json
        sessionStorage.setItem("calendarEvents",data);
        createActivityMap();
        addActivityMarkers(eventsJson);
        createCalendar();
        createInstaFeed();
    });
}
function createActivityMap() {
	var mapHolder = document.getElementById("mapHolder");
	var mapOptions = {
		center: new google.maps.LatLng(46.422979, -84.203339),
		zoom: 10
	};
	map = new google.maps.Map(mapHolder, mapOptions);
}
var infoWindow;
function addActivityMarkers(json){
    infoWindow = new google.maps.InfoWindow();
    

	for(var x=0;x<json.eventsData.length;x++){
	    var title=json.eventsData[x].title;
	    var address=json.eventsData[x].address;
	    var image=json.eventsData[x].image;
	    var startTime=calendarTimeToDisplayTime(eventsJson.eventsData[x].startTime);
	    var endTime=calendarTimeToDisplayTime(eventsJson.eventsData[x].endTime);
    	
    	//only markers that have dates that have not happened should appear on the map
    	//takes time in form of 2018-01-06 14:00:00 and makes 01/06/2018 2pm
        var timestampPresent = new Date().getTime();
        endDate=new Date(Date.parse(eventsJson.eventsData[x].endTime.replace('-','/','g')));
        //add 10 hours to the end time to add a grace period
        endTimeStamp=endDate.getTime() + (1 * 10 * 60 * 60 * 1000);
        if (timestampPresent > endTimeStamp) {
           continue;
        }
        
		var marker = new google.maps.Marker({
		    position:new google.maps.LatLng(json.eventsData[x].latitude,json.eventsData[x].longitude),
			title:title,
			address:address,
			image:image,
			index:x
		});
		allMarkers.push(marker);

		marker.setMap(map);
		google.maps.event.addListener(marker,'click',function(){
	        createPopupMenuEvent(this.index)
		});
		google.maps.event.addDomListener(window, "resize", function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center); 
        });
	}
}

//creates popup when map marker is clicked--------------------------------------
function createPopupMenuEvent(index){
	$("body").css("overflow","hidden");
	$("#map-modal").css("display","block");

	//resets carousel then recreates it
	$("#carouselSlideList").html("");
	$("#carouselSlides").html("");
	addCarouselDataEvent(index);
	
	var title=eventsJson.eventsData[index].title;
	var startTime=calendarTimeToDisplayTime(eventsJson.eventsData[index].startTime);
	var endTime=calendarTimeToDisplayTime(eventsJson.eventsData[index].endTime);
	$("#map-modal-caption").html(eventsJson.eventsData[index].address + "<br>" +startTime + " to " + endTime + "<br>" + nl2br(eventsJson.eventsData[index].description)+"<br><br><br><br><br><br><br>");

    $("#map-modal-title").text(eventsJson.eventsData[index].title);
     
	 $("#map-modal-close").click(function() { 
		 $("#map-modal").css("display","none");
		 $("body").css("overflow","scroll");
	});
	
}

//adds the slides to the carousel
function addCarouselDataEvent(index){
    
    var imageArray = eventsJson.eventsData[index].image.split("~");//splits images up that are divided by ~ in the db
    
	//tells bootstraps the number of slides in the carousel
	for(var y=0;y<imageArray.length;y++){

		//if y==0 then set it as the active slide
		if(y==0){
			$("#carouselSlideList").append("<li data-target='#theCarousel' data-slide-to='"+y+"' class='active'> </li >");
		}else{
			$("#carouselSlideList").append("<li data-target='#theCarousel' data-slide-to='"+y+"'> </li >");
		}
	}
		
	//enters the data for the slides
	for(var y=0;y<imageArray.length;y++){
    
		//if y==0 then set it as the active slide
		if(y==0){
			$("#carouselSlides").append(
				"<div class='item active' style='background-image:url("+imageArray[y]+");'>"+
				"</div>"
			);
		}else{
			$("#carouselSlides").append(
				"<div class='item' style='background-image:url("+imageArray[y]+");'>"+
				"</div>"
			);
		}		
	}
}


//filters the json for the map and locations----------------------------------
$(document).ready(function(){
	$("#mapActivitySearchButton").click(function(){
		filterActivityMarkers();
	});
	$("#mapActivitySearchTextbar").keyup(function (e) {
	    if (e.keyCode == 13) {
	        filterActivityMarkers();
	    }
	});
	function filterActivityMarkers(){
		for(var x=0;x<allMarkers.length;x++){			
			allMarkers[x].setMap(null);
		}
		var json=filterActivityJson($("#mapActivitySearchTextbar").val().toLowerCase());
		addActivityMarkers(json);
	    
	}
});
function filterActivityJson(textQuery){
    //eventsJson: eventsData=[startTime={},endTime={}, title={}, description={}, image={}, latitude={}, longitude={}, address={}, keywords={}]
		
	//As long as one of the textQuery words is in the keywords, the marker shows up
	var filteredJson = {
		eventsData: []
	};
	var searchQueryArray=textQuery.split(" ");
	if(textQuery!==""){
		for(var x=0;x<eventsJson.eventsData.length;x++){
				
			var keywords=(eventsJson.eventsData[x].keywords).toLowerCase();
				
			for(var y=0;y<searchQueryArray.length;y++){
					
				if(keywords.indexOf(searchQueryArray[y])!==-1){
					filteredJson.eventsData.push(eventsJson.eventsData[x]);	
					break;
				}
					
			}
		}
	}else{
		return eventsJson;
	}
	return filteredJson;
}

function createCalendar(){

	$('#calendar').fullCalendar({
		header:{
			left:'prev,next, today',
			center:'title',
			right:'month,agendaWeek,agendaDay'
		},
		events: function(start, end, timezone, callback) {
			var events = [];//'2014-05-01'
			var eventsJson=JSON.parse(sessionStorage.getItem("calendarEvents"));
			var jsonSize=eventsJson.eventsData.length;
			for(var x=0;x<jsonSize;x++){
				var momentStart = $.fullCalendar.moment(eventsJson.eventsData[x].startTime);
				var momentEnd = $.fullCalendar.moment(eventsJson.eventsData[x].endTime);
				var title = eventsJson.eventsData[x].title;

				events.push({
					index:x,
		            title: title,
		            start: momentStart,
		            end:momentEnd,
		        	backgroundColor:"#57BC90",
		        	borderColor:"#57BC90"
		        });
				

			}
			callback(events);
		},
		eventClick: function(calEvent, jsEvent, view) {		
			createCalendarPopup(calEvent.index,jsEvent);
		},
		eventRender: function(event, element) {
			element.css({"cursor":"pointer","font-size":"11pt"});
		},
		editable:false
		
	});
}
//eventsJson: eventsData=[startTime={},endTime={}, title={}, description={}, image={}, latitude={}, longitude={}, address={}, keywords={}]
//shows map popup
function createCalendarPopup(index,event){
    
	var title=eventsJson.eventsData[index].title;
	var startTime=calendarTimeToDisplayTime(eventsJson.eventsData[index].startTime);
	var endTime=calendarTimeToDisplayTime(eventsJson.eventsData[index].endTime);
	var img=eventsJson.eventsData[index].image;
	var modalContent="<h1>"+title+"</h1><p>From: "+startTime+"</p><p>To: "+endTime+"</p><div class='mapImage' style='background-image:url("+img+");'></div>";
	
	$("#calendarModal").html(modalContent);
    
    
    $("#calendarModal").dialog({
	    draggable: true,
        resizable: false,
        position: {
            of: event
        },
        buttons : {
            "Find Out More" : function(){
                $(this).dialog("close");
                createPopupMenuEvent(index);
            },
            "Close": function(){
                $(this).dialog("close");
            }
        }
        });
        
	$('#calendarModal').dialog("open");
}
//takes time in form of 2018-01-06 14:00:00 and makes 01/06/2018 2pm
function calendarTimeToDisplayTime(time){
    var returnTime;
    var timeArray=time.split(" ");
    
    var date=timeArray[0];
    var dateArray=date.split("-");
    date=dateArray[1]+"/"+dateArray[2]+"/"+dateArray[0];
    
    var time=timeArray[1];
    var timeArray=time.split(":");
    var hour=timeArray[0];
    var minutes=timeArray[1];
    if(hour<12){
        time=hour+":"+minutes+"am";
    }else if(hour==12){
        time=hour+":"+minutes+"pm";
    }else if(hour<24){
        time=(hour-12)+":"+minutes+"pm"
    }else{
         time=(hour-12)+":"+minutes+"am"
    }
    returnTime=date+" "+time;
    return returnTime;
}
//creates the individual event page
//Redirects to the eventPage-----------------------------------------------
function goToEventPage(index){
	//PlacePage will use the sessionStorage to access the data needed to create the page
	sessionStorage.removeItem("eventsData");
	var eventsData={eventsData:{}}; 
    eventsData.eventsData=eventsJson.eventsData[index];
	sessionStorage.setItem("eventsData",JSON.stringify(eventsData));
	window.location.href = "https://www.sugarislandhistory.com/webcontent/Explore/Event.html";
}
//called from the Event.html page
function customizeEventPage(){
	var eventPageJson=JSON.parse(sessionStorage.getItem("eventsData"));
	var placeName=eventPageJson.eventsData.title;
	document.title=placeName;
	$("#headerImg h1").text(placeName);
	$("#headerImg").css("background-image","url('"+eventPageJson.eventsData.image+"')");
	createInstaFeed();
	addEventInfo(eventPageJson);
}
//eventsJson: eventsData=[startTime={},endTime={}, title={}, description={}, image={}, latitude={}, longitude={}, address={}, keywords={}]
function addEventInfo(eventPageJson){
	
	var latitude=eventPageJson.eventsData.latitude;
	var longitude=eventPageJson.eventsData.longitude;
    var mapHolder = document.getElementById("mapHolder");
	var mapOptions = {
		center: new google.maps.LatLng(46.422979, -84.203339),
		zoom: 10
	};
	map = new google.maps.Map(mapHolder, mapOptions);
    var marker = new google.maps.Marker({
		position:new google.maps.LatLng(latitude,longitude),
		map:map
	});
	
	var startTime=calendarTimeToDisplayTime(eventPageJson.eventsData.startTime);
	var endTime=calendarTimeToDisplayTime(eventPageJson.eventsData.endTime);
	var title=eventPageJson.eventsData.title;
	var description=eventPageJson.eventsData.description;
	var address=eventPageJson.eventsData.address;
	
	$("#placeInfoHolder").append(
	    '<h1 class="color-green"><strong>'+title+'</strong></h1>'+
	    '<h3><strong>'+address+'</strong></h3>'+
	    '<h3>From: '+startTime+'</h3>'+
	    '<h3>To: '+endTime+'</h3>'+
	    '<h3>Description:</h3>'+
	    '<p>'+description+'</p>'
	);
	
}