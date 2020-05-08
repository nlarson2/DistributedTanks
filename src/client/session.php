<?php

class Session {
	
	function __construct() {
		session_start();
	}

	function userLogin($logggedIn) {
		if($_SERVER["REQUEST_METHOD"] == "POST") {

            $myusername = mysqli_real_escape_string($db,$_POST['username']);
            $mypassword = mysqli_real_escape_string($db,$_POST['password']); 
            $sql = "SELECT * FROM User WHERE u_name = '$myusername'";
            $result = mysqli_query($db,$sql);
            $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
            $isValid = password_verify($mypassword, $row['u_password']);
            $active = $row['u_active'];
            $count = mysqli_num_rows($result);

            if($count == 1 && $isValid) {
                $_SESSION['active'] = true;
                $_SESSION['login_user'] = $myusername;
                header("location:$loggedIn"); 
                exit;
            }else {
                $error = "Your Login Name or Password is invalid";
            }
        }      
        $this->loginForm($error);
	}

	function loginForm($error) {
?>
        <div id="myContent">
            <form action = "" method = "post">
            <label>Username: </label> <input type = "text" name = "username" placeholder='Username'/><br /><br />
            <label>Password: </label> <input type = "password" name = "password" placeholder='Password'/><br/><br />
            <input type = "submit" value = " Login "/><br />
            </form>
<?php echo $error; ?>
        </div>
<?php
	}



	function userCheck($user_check) {
		//$user_check = $_SESSION['login_user'];
		
		//check if user exists
		$ses_sql = //check for user in csv

		$login_session = //username from csv or $user_check

		$logged_in = true;
		if (!isset($_SESSION['login_user'])) {
			$logged_in = false;
		}
		return $logged_in;

	}

	function userLogout() {
		if(session_destroy()) {
			header("Location: localhost:44444");
		}
	}
}
?>
