<?php

    require_once('../mysqli_connect.php');

    $command = $_GET['command'];
    
    $jsonObject= new stdClass();	    	
    if(strcmp($command, "getMeetingMinuteData")==0){
    	$jsonObject=getMeetingMinuteData($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "searchStories")==0){
        $jsonObject=searchStories($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getDoYouKnowData")==0){
        $jsonObject=getDoYouKnowData($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getHistoryProjectData")==0){
        $jsonObject=getHistoryProjectData($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getMapData")==0){
        $jsonObject=getMapData($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getPlacesToStay")==0){
        $jsonObject=getPlacesToStay($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getThingsToDo")==0){
        $jsonObject=getThingsToDo($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getAboutData")==0){
        $jsonObject=getAboutData($dbc,$jsonObject);
    	$json= json_encode($jsonObject);
    }else if(strcmp($command, "getFundraisingData")==0){
        $jsonObject = getFundraisingData($dbc,$jsonObject);
    	$json = json_encode($jsonObject);
    }else if(strcmp($command, "getParticipateData")==0){
        $jsonObject = getParticipateData($dbc,$jsonObject);
    	$json = json_encode($jsonObject);
    }
    
	// Close connection to the database
	mysqli_close($dbc);
	echo $json;


function getParticipateData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM participate");
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->date=$dbResults['date'];
			$dbIndexObject->description=$dbResults['description'];
			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);
        return;
	}
	$jsonObject->participateData = $jsonArray;
	
	return $jsonObject;
}


function getFundraisingData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM fundraising");
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->date=$dbResults['date'];
			$dbIndexObject->description=$dbResults['description'];
			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);
        return;
	}
	$jsonObject->fundraisingData = $jsonArray;
	
	return $jsonObject;
}

function getAboutData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM members");
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->name=$dbResults['name'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->position=$dbResults['position'];
			$dbIndexObject->description=$dbResults['description'];
			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);
        return;
	}
	$jsonObject->memberData = $jsonArray;
	
	return $jsonObject;
}
function getThingsToDo($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM things_to_do");
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->startTime=$dbResults['start_time'];
			$dbIndexObject->endTime=$dbResults['end_time'];
			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->description=$dbResults['description'];
			$dbIndexObject->type=$dbResults['type'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->latitude=$dbResults['latitude'];
			$dbIndexObject->longitude=$dbResults['longitude'];
			$dbIndexObject->address=$dbResults['address'];
			$dbIndexObject->keywords=$dbResults['keywords'];
			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);
        return;
	}
	$jsonObject->eventsData = $jsonArray;
	return $jsonObject;
}
function getPlacesToStay($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM places_to_stay");
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->latitude=$dbResults['latitude'];
			$dbIndexObject->longitude=$dbResults['longitude'];
			$dbIndexObject->name=$dbResults['name'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->description=$dbResults['description'];
			$dbIndexObject->phone=$dbResults['phone'];
			$dbIndexObject->address=$dbResults['address'];
			$dbIndexObject->cost=$dbResults['cost'];

			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->stayPlaceData = $jsonArray;
	return $jsonObject;
}
function getHistoryProjectData($dbc,$jsonObject){
     // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM historical_projects");
    
	//creates jsonObject for each index of the db and inserts them into the projectArray
	//This array is then added to the jsonObject that will be returned
	$jsonArrayProject = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();

			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->description=$dbResults['description'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->subTitle=$dbResults['sub_title'];
			$dbIndexObject->subParagraph=$dbResults['sub_paragraph'];
			$dbIndexObject->subImage=$dbResults['sub_image'];
			$dbIndexObject->category=$dbResults['category'];
			$dbIndexObject->keywords=$dbResults['keywords'];
			
			$jsonArrayProject[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->projectData = $jsonArrayProject;
	return $jsonObject;
}
function getDoYouKnowData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM do_you_know_contest");
    
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();
            
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->question=$dbResults['question'];
			$dbIndexObject->answer=$dbResults['answer'];

			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->doYouKnowData = $jsonArray;
	return $jsonObject;
}
function getMapData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM map");
    
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();
            
			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->image=$dbResults['image'];
			$dbIndexObject->description=$dbResults['description'];
			$dbIndexObject->latitude=$dbResults['latitude'];
			$dbIndexObject->longitude=$dbResults['longitude'];
			$dbIndexObject->address=$dbResults['address'];
			$dbIndexObject->keywords=$dbResults['keywords'];

			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->mapData = $jsonArray;
	return $jsonObject;
}
function getMeetingMinuteData($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query
    $response=$dbc->query("SELECT * FROM meeting_minutes");
    
	//creates jsonObject for each index of the db and inserts them into the mapArray
	//This array is then added to the jsonObject that will be returned
	$jsonArray = array();

	// If the query executed properly proceed
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();
            
			$dbIndexObject->date=$dbResults['date'];
			$dbIndexObject->dateText=$dbResults['date_text'];
			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->meetingContent=$dbResults['meeting_content'];

			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->meetingData = $jsonArray;
	return $jsonObject;
}	
function searchStories($dbc,$jsonObject){
    // Get a response from the database by sending the connection and the query

	$keyword = $_GET["keyword"];
	
	$queryCondition = "";
	if(!empty($keyword)) {
		$wordsAry = explode(" ", $keyword);
		$wordsCount = count($wordsAry);
		$queryCondition = " WHERE ";
		for($i=0;$i<$wordsCount;$i++) {
			$queryCondition .= "title LIKE '%" . $wordsAry[$i] . "%' OR description LIKE '%" . $wordsAry[$i] . "%'";
			if($i!=$wordsCount-1) {
				$queryCondition .= " OR ";
			}
		}
	}
	$orderby = " ORDER BY id desc"; 
	$sql = "SELECT * FROM stories " . $queryCondition;
	$response = mysqli_query($dbc,$sql);	
	
	if($response){
		while($dbResults = mysqli_fetch_array($response)){
            $dbIndexObject= new stdClass();
    

			$dbIndexObject->title=$dbResults['title'];
			$dbIndexObject->description=$dbResults['description'];
            $dbIndexObject->imageHeader=$dbResults['image_header']; 
			$dbIndexObject->subTitle=$dbResults['subtitle'];
			$dbIndexObject->subParagraph=$dbResults['subparagraph'];
			$dbIndexObject->subImage=$dbResults['subimage'];

			$jsonArray[]=$dbIndexObject;
		}
	}else{

		echo "Couldn't issue database query<br />";

		echo mysqli_error($dbc);

	}
	$jsonObject->storyData = $jsonArray;
	return $jsonObject;

}	
?>