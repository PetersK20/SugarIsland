<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="ISO-8859-1">
	
	<!-- page description -->
	<meta name="description"
	content=""/>
	
	<!-- Keywords for search engine -->
	<meta name="keywords"
	content=""/>
	
	<title>Contact Us</title>
	<!-- stops telephone number from being auto styled -->
	<meta name="format-detection" content="telephone=no">
	<!-- for bootstraps -->
	<meta name="viewport" content="width = device-width, initial-scale = 1">
	<!-- JQuery UI-->
	<link rel="stylesheet" type=text/css href="../css/jquery-ui.min.css">	
	<!-- Add social media icon library -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">	
	<!-- JQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<!-- JQuery UI-->
	<script src="../js/jquery-ui.min.js"></script>
	<!-- bootstraps -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<!-- bootstraps -->
	<link rel="stylesheet" type=text/css href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	
	<!-- Page stylesheets-->
	<link rel="stylesheet" href="../SiteStyleSheet.css">
	
	
</head>
<body onload="createInstaFeed();">
    
<?php
    
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    
    $names = test_input($_POST['contact-name']);
    $subject = test_input($_POST['contact-subject']);
    $message = test_input($_POST['contact-message']);
    $from = test_input($_POST['contact-email']);
        
    if (empty($_POST["contact-name"])) {
        $nameErr = "Name is required";
    } else {
        $name = test_input($_POST["contact-name"]);
        if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
            $nameErr = "Only letters and white space allowed"; 
        }
    }
    
    if (empty($_POST["contact-subject"])) {
        $subjectErr = "Subject is required";
    } else {
        $subject = test_input($_POST["contact-subject"]);
    }
    
    if (empty($_POST["contact-message"])) {
        $messageErr = "Message is required";
    } else {
        $message = test_input($_POST["contact-message"]);
    }
    
    if (empty($_POST["contact-email"])) {
        $fromErr = "Your email is required";
    } else {
        $from = test_input($_POST["contact-email"]);
        if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
            $fromErr = "Invalid email format"; 
        }
    }
      
      
    if($nameErr=="" && $subjectErr=="" && $messageErr=="" && $fromErr==""){
        $to = 'Peters_K20@Moeller.org';
        $header = 'From:'. test_input($_POST['contact-email']);
        mail($to, $subject, $message, $header);
        $successMessage="You have successfully sent your message to us.";
        $name = $message = $subject = $from = "";
    }
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>


	<div class="hidden-lg hidden-md" style="height:70px"></div>
	
	<!-- For sm and xs screen size - creates the panel that displays the title of the page, links to other pages, and the logo -->
	<div id="headerSm" class="hidden-lg hidden-md">
	
		<div id="headerSm-menuHolder" onclick="changeMenuIcon(this)">
  			<div id="headerSm-menuBar1"></div>
  			<div id="headerSm-menuBar2"></div>
  			<div id="headerSm-menuBar3"></div>
  			<h4 id="headerSm-menuLabel">Menu</h4>
		</div>
		
		
		<!-- displays the map icon at the top right of the screen-->
		<div id="headerSm-mapIconHolder">
			<span id="headerSm-mapIcon" class="glyphicon glyphicon-map-marker"></span>
		</div>
		
		<div align="center">

			<!-- displays the Sugar Island logo at the top right of the screen-->
			<div id="headerSm-logo">
				<img width=80px height=75px class="img" src="../Img/sugarIslandLogo.jpg">
			</div>
			
		</div>
		
		
	</div>
		
	<!-- navSm is at the bottom of the page and will be animated to the top of the screen -->
	<div id="headerSm-navSm" class="hidden-lg hidden-md">
	
		<!-- creates accordion that displays links to other pages  -->
		<div id="navSm-animationAccordion">
					
			<h4 style="border-top:1px solid black;">Get Involved</h4>
			
			<div style="background:rgb(240,240,240); padding:0px;">
			
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/GetInvolved/Donate.html" class="navSm-pageLink">Donate</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/GetInvolved/FundRaising.html" class="navSm-pageLink">Fund Raising</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/GetInvolved/Join.html" class="navSm-pageLink">Join</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/GetInvolved/Participate.html" class="navSm-pageLink">Participate</a>
				</div>
				
			</div>
			
			
			<h4>Articles</h4>
			
			<div style="background: rgb(240,240,240); padding:0px;">
			    <div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Articles/MeetingMinutes.html" class="navSm-pageLink">Meeting Minutes</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Articles/Stories.html" class="navSm-pageLink">Stories</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Articles/Newsletter.html" class="navSm-pageLink">News Letter</a>
				</div >
			</div>
			
			
			<h4>Explore</h4>
			
			<div style="background: rgb(240,240,240); padding:0px;">
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Explore/Map.html" class="navSm-pageLink">Historical Sites</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Explore/DoYouKnowContest.html" class="navSm-pageLink">Do You Know?</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Explore/HistoricalProjects.html" class="navSm-pageLink">Historical Projects</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/Explore/UpcomingEvents.html" class="navSm-pageLink">Upcoming Events</a>
				</div>
			</div>
			
			
			<h4>About</h4>
			
			<div style="background: rgb(240,240,240); padding:0px;">
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/About/AboutUs.html" class="navSm-pageLink">About Us</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/About/Members.html" class="navSm-pageLink">Our Members</a>
				</div>
				<hr>
				<div class="navSm-pageLinkHolder">
					<a href="https://www.sugarislandhistory.com/webcontent/About/ContactUs.php" class="navSm-pageLink active">Contact Us</a>
				</div>
			</div>
		</div>
		<!-- the SmNavBar is positioned absolutely at top:85px which stops the scroll bar from going all the way to the bottom
		this is used to fix the problem -->
		<div style="height:85px"></div>
	
	</div>
	
	
	<!-- For lg and md screen size - creates the panel that displays the links to other pages, and the logo -->
	<div id="headerLg" class="hidden-sm hidden-xs">
		<div align="center">
			<div style="max-width:1200px;">
				<!-- displays the Sugar Island logo at the top left of the screen-->
				<span id="headerLg-logo">
					<em>SUGAR ISLAND <br> HISTORY</em>
					<img width=70px height=70px class="img img-responsive" src="../Img/sugarIslandLogo.jpg">
				</span>
				
				<!-- displays the donate/contact on the right of the screen-->
				<div id="headerLg-donateContactHolder">
					<a href="../GetInvolved/Donate.html"><button class="btn btn-orange btn-md">Donate</button></a>
					<a href="../About/ContactUs.php"><button class="btn btn-orange btn-md">Contact</button></a>
				</div>
				
				
				
				<div align="center">
					<!-- adds the page links -->
					<div id="headerLg-navLg">
			
						<div class="navLg-pageLinkHolder">
							<span class="navLg-pageLink"><a href="../GetInvolved/Donate.html">GET INVOLVED</a></span>
						</div>
						<div class="navLg-pageLinkHolder">
							<span class="navLg-pageLink"><a href="../Articles/MeetingMinutes.html">ARTICLES</a></span>
						</div>
						<div class="navLg-pageLinkHolder">
							<span class="navLg-pageLink"><a href="../Explore/Map.html">EXPLORE</a></span>
						</div>
						<div class="navLg-pageLinkHolder active">
								<span class="navLg-pageLink"><a href="../About/AboutUs.html">ABOUT US</a></span>
						</div>
						
					</div>
				</div>
			</div>
		</div>
		
		<br>
		<div align="center">
		    <div id="headerLg-subNavigation">
    			<div class="subNavigation-pageLinkHolder threeSubLinks">
    					<span class="subNavigation-pageLink"><a href="AboutUs.html">About Us</a></span>
    			</div>
    			<div class="subNavigation-pageLinkHolder threeSubLinks">
    				<span class="subNavigation-pageLink"><a href="Members.html">Our Members</a></span>
    			</div>
    			<div class="subNavigation-pageLinkHolder threeSubLinks active">
    				<span class="subNavigation-pageLink"><a href="ContactUs.php">Contact Us</a></span>
    			</div>
    		</div>
		</div>
		
	</div>
	
	<!-- subNav is moved up 25px so the top 25px of the headerImg was displayed under the subNav, this fixes that-->
	<div style="height:29px" class="hidden-sm hidden-xs">
	</div>
	
	<div id="headerImg" style="background-image:url('https://www.53.com/content/dam/fifth-third/heroes/1440x330-Professional-Business-126.jpg')">

		<div class="container-fluid" align="center">
			<div class="col-xs-12 col-md-10">
				<h1>Contact Us</h1> 
			</div>
			<div class="col-xs-12 col-md-10">
				<h3>We appreciate all your feedback on Sugar Island, our history society, and our website.</h3>
			</div>
		</div>	
		
	</div>
	
<!-- holds all of the content that is unique to this page -->
<div id="contentWrapper">
	
	<div align="center">
		<div class="widthLimiterHolder">
			<form id="form" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>#form">
				<br>
				<br>
				<h1 class="color-green">Your name:</h1>
				<span class="errorMessage"> <?php echo $nameErr;?></span>
				<div class="form-group form-group-lg">
				    <input type="text" class="form-control" name="contact-name" value="<?php echo $name;?>">
				</div>
		
			    <h1 class="color-green">Subject:</h1>
			    <span class="errorMessage"> <?php echo $subjectErr;?></span>
			    <div class="form-group form-group-lg">
			    	<input type="text" class="form-control" name="contact-subject" value="<?php echo $subject;?>">
			    </div>
			    
			    <h1 class="color-green">Your e-mail:</h1>
			    <span class="errorMessage"> <?php echo $fromErr;?></span>
			    <div class="form-group form-group-lg">
			    	<input type="text" class="form-control" name="contact-email" value="<?php echo $from;?>">
			    </div>
			    
			    <h1 class="color-green">Message:</h1>
			    <span class="errorMessage"> <?php echo $messageErr;?></span>
			    <div class="form-group">  
				    <textarea rows="5" class="form-control" name="contact-message" style="resize:none;"><?php echo $message;?></textarea>			
				</div>
				
			    <input type="hidden" name="command" value="email">
			    
			    <p class="color-green"><?php echo $successMessage;?></p>
			    
			    
			    <input type="submit" value="Send" class="btn btn-green">
			    <input type="reset" value="Reset" class="btn btn-green">
			    <br>
			    <br>
			</form>
		</div>
	</div>
	





	<br>
	<div class="container-fluid" align="center">
		<div align="left">
			<br>
			<br>
			<br>
			<h1 id="footer-instagramHeader">Our Instagram</h1>
			<div id="footer-instagram-headerUnderline"></div>
			<br>
		</div>
			
		<div id="instagramWrapper" class="tabcontent">
			<div id="instafeed" class="row"></div>
		</div>
	</div>
		
		
	<!-- displays the bottom footnote -->
	<div id="bottomFootnote" class="container-fluid" align="center">
	    <!-- link to the top of the screen -->
		<br>
		<h3><a id="pageTop" href=#>Top of Page</a></h3>
		
		<div class="row" style="max-width:1200px; margin:0px 20px">
			<!-- displays the contact info for Sugar Island -->
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="border:1px solid rgb(150,150,150); background:white; height:300px">
				<h3 class="title"><b>Contact Us</b></h3>
				<hr style="border:1px solid rgb(150,150,150);">
				<h4 class="subTitle">P.O box:</h4>		
				<h5 class="info">Box 71, SAULT SAINTE MARIE, MI 49783</h5>
				<h4 class="subTitle">Phone:</h4>
				<h5 class="info">(513)791-1680</h5>
				<h4 class="subTitle">Email:</h4>
				<h5 class="info">Jgaier@moeller.org</h5>

			</div>
			<!-- displays the contact info for INTERAlliance -->
			<div id="newsletterHolder" class="col-lg-6 col-md-6 col-sm-6 col-xs-12" style="background:white; height:300px">
				<h3 class="title"><b>Newsletter</b></h3>
				<hr style="border:1px solid rgb(150,150,150);">
				
				<span id="footerNewsletter-responseMessage"></span>
				<br>
				<div></div>
				<div class="input-group input-group-lg" style="margin-top:2px">
					<input type="text" class="form-control" placeholder="Email" id="footerNewsletter-emailTextBar" onkeypress="emailKeyListenerFooter();">
				 	<span class="input-group-btn">
				    	<button class="btn btn-green" onclick="addToNewsletterFooter();" type="button">submit</button>
					</span>
				</div>
				<br><br>
				<a href="https://www.facebook.com/interalliance/" class="fa fa-facebook"></a>		
				<a href="https://twitter.com/interalliancegc" class="fa fa-twitter"></a>
				<!-- use image from the web for the instagram icon -->
				<a href="https://www.instagram.com/permanentroadtrip/" class="fa" style="padding:0px">
					<img width="100%" height="100%" style="border-radius:50%; background:white;" src="https://www.sugarislandhistory.com/webcontent/Img/instagram_logo.png">
				</a>
			</div>
		</div>
		<hr>
		<b class="info" style="text-align:center">@ Sugar Island Historical Preservation Society. All Rights Reserved</b>
		<br><br>
	</div>
</div>	
	
	<!-- div that covers the whole screen in order to put focus on the options in sm and xs when you hit the menu button -->
	<div id="focusDiv" class="hidden-lg hidden-md"></div>

	
	<!-- Navigation JS Files -->
	<script src="../SiteInteractor.js"></script>
	<script src="../InvolvementInteractor.js"></script>
	<!-- instafeed.js -->
	<script type="application/javascript" src="../js/instafeed.min.js"></script>
</body>
</html>