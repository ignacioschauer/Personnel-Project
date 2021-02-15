<?php

	// LocalHost

	/*$cd_host = "127.0.0.1"; 
	$cd_port = 3306;
	$cd_socket = "";
	$cd_user = "root"; // user name
	$cd_password = ""; // password sElling@348
	$cd_dbname = "companydirectory"; // database name
	
	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);*/

	// Web Server 

	$host_name = "db5001726170.hosting-data.io";
	$database = "dbs1425616";
	$user_name = "dbu1091011";
	$password = "Ignacio12.";

	$conn = new mysqli($host_name, $user_name, $password, $database);

?>