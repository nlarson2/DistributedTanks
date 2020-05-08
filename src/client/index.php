<?php
//require('redis-session-php/redis-session.php');
//RedisSession::start();

include('session.php');
include('user_management.php');

$sess = new Session();
$err = "";

if (isset($_SESSION['login_user'])) {
	echo "login_user is set";
	$logged_in = $sess->userCheck($_SESSION['login_user']);
}


$users = new Users();

if ($_SERVER['REQUEST_METHOD'] == "POST") {
	$username = $_POST['in_game_name'];
	$password = $_POST['password'];

	if (empty($username)) { 
		$err .= "*Username is required";
	}

	if (empty($password)) {       
		$err .= "*Password is required"; 
	}

	//check for existing user in csv
	if ($users->checkUsers($username)) {
		$users->checkCredentials($username, $password);
		$users->setActive($username);
		$_SESSION['login_user'] = $username;
		$_SESSION['active'] = true;
	/*
	$port = '44444';
	header('Location: '
    		. ($_SERVER['HTTPS'] ? 'https' : 'http')
    		. '://' . $_SERVER['HTTP_HOST'] . ':' . $port
    		. $_SERVER['REQUEST_URI']);
	exit;*/

	header('Location: 127.0.0.1:44444');
	exit;

	//header('location: localhost:44444');
    } else { $err .= "*Your Login Name or Password is Invalid"; }

}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TANKS</title>
    <link rel="stylesheet" href="./styles/main.css">
    <link rel="stylesheet" href="./styles/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Black+Ops+One">
</head>
<body id="body" class="login-background">
    <canvas id="game_canvas"></canvas>
    <ul id = "PlayerList">
    </ul>
    <div id="play_menu">
      <h1 class="display-3 text-center" style="font-family: 'Black Ops One', cursive; padding-top: 100px">Tank Game</h1>
      <div class="login-clean">
	<h2 class="sr-only">Login Form</h2>
	<div class="container" style="width: 100%;">
	    <div class="col-sm" id = "playerNameForm" style= "">
	    <?php echo $err; ?>
		<form action = "" method = "post">

		    <div class="form-group ">
		    <input class="form-control" type="text" id="in_game_name" name="in_game_name" placeholder="Username">
		    <input class="form-control" type="password" id="in_game_name" name="password" placeholder="Password">
		</div>
		<input type="submit" id="play_button" class="btn btn-danger btn-block" style="width: 100%; margin: auto; " value=" Log in ">
	    </form>

	    <div class="form-group " style="text-align:center">
	      <p style="color:white;">Need an account? <br>
	      <a href="register_.php" style="color:white"><b>Register Here</b></a> </p>
	    </div>

	    </div>

	    <div class="col-lg" id = "joinServerForm" style="display: none;">
	      <form id = "joinForm" style="width: 100%;">
		    <div class="form-group ">
		<input id = "TEST" type="text" style="display: none;"/>
		<table id = "serverList">

		</table>
	      </div>
	      </form>
	      <button id='refresh_servers' class='btn btn-danger btn-block' style="width: 15%; margin: auto;">Refresh</button>
	    </div>
	</div>
      </div>
    </div>
    <div id="leaderboard" class="hidden">
    </div>
    <div id="disconnect" class="hidden">
    </div>
    <div id="game_full" class="hidden">
    </div>
    <script src="./DistributedTanks/src/client/index.js"></script>
    <script>
      var list = document.getElementById("TEST")
      list.addEventListener('change', () => {alert("WORKED FINALLY")})
    </script>
  </body>
</html>
