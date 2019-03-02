var aboutJson;
//aboutJson={memberData=[name={},image={},position={},description={}]}
function getDbInfo(){
    $.get("https://www.sugarislandhistory.com/webcontent/GetServer.php?command=getAboutData", function(data){
        aboutJson=JSON.parse(data);
        addMembers();
        createInstaFeed();
    });
}
function addMembers(){
    for(var x=0;x<aboutJson.memberData.length;x++){ 
        var name=aboutJson.memberData[x].name;
        var image=aboutJson.memberData[x].image;
        var position=aboutJson.memberData[x].position; 
        var description=aboutJson.memberData[x].description;
        $("#aboutUs_members").append(
            '<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">'+
                '<div align="center">'+
                    '<div class="member_image" style="background-image:url('+image+');"></div>'+
                    '<h3 class="member-name"><strong>'+name+'</strong></h3>'+
                    '<p class="member-position">'+position+'</p>'+
                '</div">'+
                '<p class="member-description">'+description+'</p>'+
            '</div>'
        );
    }
}