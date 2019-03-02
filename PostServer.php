<?php

    require_once('../mysqli_connect_si.php');

    $command = $_GET['command'];
    if(strcmp($command,"")==0){
       $command="email";
    }

    $textResponse;	    	
    if(strcmp($command, "insertNewsletter")==0){
    	$response=insertNewsletter($dbc,$textResponse,$email);
    }else if(strcmp($command, "removeNewsletter")==0){
        $response=removeNewsletter($dbc,$textResponse,$email);
    }
    echo $textResponse;
    
function insertNewsletter($dbc,$textResponse){
    $email = $_GET['email'];

    $stmt=$dbc->prepare("REPLACE INTO newsletter(email) VALUES (?)");

	$stmt->bind_param("s",$email);
            
    $stmt->execute();
            
    $affected_rows = mysqli_stmt_affected_rows($stmt);

    if($affected_rows >= 1){
        echo 'success';
    }else{
        echo 'Error Occurred '+mysqli_error($dbc);
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);

}
function removeNewsletter($dbc,$textResponse){
    $email = $_GET['email'];

    $stmt=$dbc->prepare("DELETE FROM newsletter WHERE email=?");

	$stmt->bind_param("s",$email);
            
    $stmt->execute();
            
    $affected_rows = mysqli_stmt_affected_rows($stmt);

    if($affected_rows >= 1){
        echo 'success';
    }else{
        echo 'Error Occurred '+mysqli_error($dbc);
    }
    
    mysqli_stmt_close($stmt);
    mysqli_close($dbc);

}

?>