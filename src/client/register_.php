<?php
//require('redis-session-php/redis-session.php');
//RedisSession::start();

include('session.php');
include('user_management.php');

$sess = new Session();
$users = new Users();

$err = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	echo "here";
	if (isset($_POST['username']) && isset($_POST['password_1']) && isset($_POST['password_2'])) {
		echo "now here";
		$username = $_POST['username'];
		$password_1 = $_POST['password_1'];
		$password_2 = $_POST['password_2'];
	//check for existing user in csv
		if (!$users->checkUsers($username)) {
			$users->addUser($username, $password_1);
			$users->setActive($username);
			$_SESSION['login_user'] = $username;
			$_SESSION['active'] = true;

			header('location: index.php');
		} else { $err .= "*Username already exists"; }
	}
	if (empty($username)) { 
		$err .= "*Username is required";
	}

	if (empty($password_1)) {       
		$err .= "*Password is required"; 
	}

	if ($password_1 != $password_2) {        
		$err .= "*Psswords don't match";
	}
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
                    <input class="form-control" type="text" id="in_game_name" name="username" placeholder="Username">
                    <input class="form-control" type="password" id="in_game_name" name="password_1" placeholder="Password">
                    <input class="form-control" type="password" id="in_game_name" name="password_2" placeholder="re-type Password">
                </div>
                <input type="submit" id="play_button" class="btn btn-danger btn-block" style="width: 100%; margin: auto; " value=" Register ">
            </form>
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
    <script src="./index.js"></script>
    <script>
      var list = document.getElementById("TEST")
      list.addEventListener('change', () => {alert("WORKED FINALLY")})
    </script>
  </body>
</html>
