
//changes the text in a <p> based on what option/link the user clicks
var joinText="Membership info Membership info Membership info Membership info Membership info";
var participateText="Work Crews, Raffle Ticket Sales, Work at the Yard Sale, Contribute 	stories/articles for use, record interviews and events for current and oral history projects.";
var donateText="INKIND DONATIONS OF BUILDING MATERIALS ETC., ARTIFACTS RELATED TO SUGAR ISLAND, DOCUMENTS,PRIZES, AND SUCH TO BE RAFFLED OR USED AS GIFTS. DONATIONS MAY BE TAX DEDUCTABLE. CHECK WITH YOUR TAX ADVISOR. We are a Tax Exempt Charity both in Michigan and as a 501c3 chaity by IRS registration.";
var overviewText="Work Crews, Raffle Ticket Sales, Work at the Yard Sale, Contribute 	stories/articles for use, record interviews and events for cu";
var fundRaisingText="Work Crews, Raffle Ticket Sales, Work at the Yard Sale, Contribute stories/articles for use, record interviews and events for cu";
var officersText="2017 – 2018 OFFICERS GEORGE SNIDER, PRESIDENT";
var contactUs="Contact Us";
var activeSelectionOption=$("#selectionOption-donate");

//gets a string based on the option that the user selects based on that string the displayAreHolder text is set and the selected option 
//gets a blue border and the last selected border gets its border removed
function changeParagraph(chosenOption){
	activeSelectionOption.css("border-left","0px solid white");
	if(chosenOption=="Join"){
		$("#displayArea").text(joinText);
		$("#displayArea").append("<br><br><a href='../GetInvolved/Join.html'><button class='btn btn-green btn-md'><span class='textHolder'>Join</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-join").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-join");
	}
	else if(chosenOption=="Participate"){
		$("#displayArea").text(participateText);
		$("#displayArea").append("<br><br><a href='../GetInvolved/Participate.html'><button class='btn btn-green btn-md'><span class='textHolder'>Participate</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-participate").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-participate");
	}
	else if(chosenOption=="Donate"){
		$("#displayArea").text(donateText);
		$("#displayArea").append("<br><br><a href='../GetInvolved/Donate.html'><button class='btn btn-green btn-md'><span class='textHolder'>Donate</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-donate").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-donate");
	}
	else if(chosenOption=="Overview"){
		$("#displayArea").text(overviewText);
		$("#displayArea").append("<br><br><a href='../About/AboutUs.html'><button class='btn btn-green btn-md'><span class='textHolder'>Overview</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-overview").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-overview");
	}
	else if(chosenOption=="Fund Raising"){
		$("#displayArea").text(fundRaisingText);
		$("#displayArea").append("<br><br><a href='../GetInvolved/FundRaising.html'><button class='btn btn-green btn-md'><span class='textHolder'>Fund Raising</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-fundRaising").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-fundRaising");
		//last option is Officers info
	}
	else if(chosenOption=="Contact"){
		$("#displayArea").text(contactUs);
		$("#displayArea").append("<br><br><a href='../About/ContactUs.php'><button class='btn btn-green btn-md'><span class='textHolder'>Contact Us</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-contact").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-contact");
		//last option is Officers info
	}
	else{
		$("#displayArea").text(officersText);
		$("#displayArea").append("<br><br><a href='../About/Members.html'><button class='btn btn-green btn-md'><span class='textHolder'>Overview</span><span class='glyphicon glyphicon-chevron-right'></span></button></a>");
		
		$("#selectionOption-officers").css("border-left","5px solid #57BC90");
		activeSelectionOption=$("#selectionOption-officers");
	}
}



