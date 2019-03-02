//fundraisingJson: fundraisingData=[title={},image=[], description=[], date={}]
var fundraisingJson;
//used to allow the event function to access this json
function getFundraisingData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getFundraisingData", function(data){
        fundraisingJson=JSON.parse(data);
        addfundraisingEvents();
        createInstaFeed();
    });
}

function addfundraisingEvents(){
    for(var x=0;x<fundraisingJson.fundraisingData.length;x++){
        //add new row after two elements so different image sizes doesn't screw up the layout
        var multipleOfTwo = x % 2;
        if(multipleOfTwo==0){
            $("#fundraisingHolder").append('<div class="row"></div>')
        }
        
        $("#fundraisingHolder:last-child").append(
    		'<div class="fundraisingEvent col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
    		    '<div>'+
        		    '<h1 class="color-green">'+fundraisingJson.fundraisingData[x].title+'</h1>'+
        		    '<p><strong>'+fundraisingJson.fundraisingData[x].date+'</strong></p>'+
        			'<p>'+fundraisingJson.fundraisingData[x].description+'</p>'+
        		'</div>'+
        		
    			'<div>'+
    			    '<img src='+fundraisingJson.fundraisingData[x].image+' style="width:100%">'+
    			'</div>'+
    			
    		'</div>'
    		
    	);
    }
}




//participateJson: participateData=[title={},image=[], description=[], date={}]
var participateJson;
//used to allow the event function to access this json
function getParticipateData(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getParticipateData", function(data){
        participateJson=JSON.parse(data);
        addParticipateEvents();
        createInstaFeed();
    });
}

function addParticipateEvents(){
    for(var x=0;x<participateJson.participateData.length;x++){
        var multipleOfTwo = x % 2;
        if(multipleOfTwo==0){
            $("#participateHolder").append('<div class="row"></div>')
        }
        $("#participateHolder:last-child").append(
    		'<div class="participateEvent col-lg-6 col-md-6 col-sm-12 col-xs-12">'+
    		    '<div>'+
        		    '<h1 class="color-green">'+participateJson.participateData[x].title+'</h1>'+
        		    '<p><strong>'+participateJson.participateData[x].date+'</strong></p>'+
        			'<p>'+participateJson.participateData[x].description+'</p>'+
        		'</div>'+
        		
    			'<div>'+
    			    '<img src='+participateJson.participateData[x].image+' style="width:100%">'+
    			'</div>'+
    			
    		'</div>'		
    	);
    }
}



function setAmount(){
    sessionStorage.setItem("amount",$("#donationAmount").text());
}