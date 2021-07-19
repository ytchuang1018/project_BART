<?php
    $dbhost = 'localhost';
    $dbuser = 'root';
    $dbpass = '2wsx2wsx';
    $dbname = 'php_databaseajax';
    $conn = mysql_connect($dbhost, $dbuser, $dbpass) or die('Error with MySQL connection');
    mysql_query("SET NAMES 'utf8'");
    mysql_select_db($dbname);
	//set taiwan zone
	date_default_timezone_set('Asia/Taipei');
	
	$sql = 'SELECT * FROM `bart` WHERE `user_name` = "'.$_POST['user_name'].'"';
	$result = mysql_query($sql);
	$row = mysql_fetch_assoc($result);
	$record_count = mysql_num_rows($result); 
	session_start();
	if($record_count<1){
		//無資料回傳no data
		
		$_SESSION['name']=$_POST['user_name'];
		echo 'success';
	}//else{
		//若有這筆資料則回傳user_name
		//$_SESSION['user_name'] = $user_name;
		//echo $row['user_name'];  // for debug use
	//} 
?>