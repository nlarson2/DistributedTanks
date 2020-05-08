<?php
Global $filename;
Class Users {

	function __construct() { 
		//start csv read/write system
		$filename = "DistributedTanks/src/server/users.csv";
	}

	function checkUsers($username) {
		//checks csv for user, returns true or false
		$file = fopen("DistributedTanks/src/server/users.csv","r");
		$result = false;

		while(! feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if($userInfo[0] == $username) {
				$result = true;
			}
		}
		fclose($file);

		return $result;
	}

	function checkCredentials($username, $password) {
		//get user password and compare passwords, must hash password to compare to hashed password
		$hashedPwd = password_hash($password, PASSWORD_DEFAULT);
		$file = fopen("DistributedTanks/src/server/users.csv","r");
		$result = false;

		while(! feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if($userInfo[0] == $username) {
				if($userInfo[1] == $hashedPwd) {
					$result = true;
				}
			}
		}
		fclose($file);

		return $result;
	}

	function checkStatus($username) {
		//checks for user activity, can't have two of same user on
		$file = fopen("DistributedTanks/src/server/users.csv","r");
		$result = false;
		while(! feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if($userInfo[0] == $username) {
				if ($userInfo[2] == "true") {
					$result = true;
				}
			}
		}
		fclose($file);

		return $result;
	}

	function setActive($username) {
		//sets user as active
		$file = fopen("DistributedTanks/src/server/users.csv", 'r');
		$newFile = fopen('DistributedTanks/src/server/temp.csv', 'w');
		while(!feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if ($userInfo[0] == $username) {
				$userInfo[2] == "true";
			}
			fputcsv($newFile, $userInfo);
		}
		fclose($file);
		fclose($newFile);

		unlink('DistributedTanks/src/server/users.csv');
		rename('DistributedTanks/src/server/temp.csv', 'DistributedTanks/src/server/users.csv');
	}

	function setNotActive($username) {
		//sets user as not active
		$file = fopen("DistributedTanks/src/server/users.csv", 'r');
		$newFile = fopen('DistributedTanks/src/server/temp.csv', 'w');
		while(!feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if ($userInfo[0] == $username) {
				$userInfo[2] == "false";
			}
			fputcsv($new, $userInfo);
		}
		fclose($file);
		fclose($newFile);

		unlink('DistributedTanks/src/server/users.csv');
		rename('DistributedTanks/src/server/temp.csv', 'DistributedTanks/src/server/users.csv');
	}

	function addUser($username, $password) {
		//adds user info, saves password as a hash (for security)
		$hashedPwd = password_hash($password, PASSWORD_DEFAULT);
		$record = array($username, $hashedPwd, "false", "NULL" ,"NULL", "NULL");

		$file = fopen("DistributedTanks/src/server/users.csv", "a");
		
		fputcsv($file, $record);
		
		fclose($file);

	}

	function chngPassword($username, $new_password) {
		//finds user and changes password
		$hashedPwd = password_hash($new_password, PASSWORD_DEFAULT);

		$file = fopen($filename, 'r');
		$newFile = fopen('DistributedTanks/src/server/temp.csv', 'w');
		while(!feof($file)) {
			$userInfo = fgetcsv($file, 1000, ",");
			if ($userInfo[0] == $username) {
				$userInfo[1] == $hashedPwd;
			}
			fputcsv($new, $SuserInfo);
		}
		fclose($file);
		fclose($newFile);

		unlink('DistributedTanks/src/server/user.csv');
		rename('DistributedTanks/src/server/temp.csv', 'DistributedTanks/src/server/users.csv');
	}
}
//CSV Format
// username, password(hashed), status, nid, temp key(hex), temp iv(hex)
?>
