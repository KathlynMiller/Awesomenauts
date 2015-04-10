<?php 
   require_once(__DIR__ . "/../model/config.php");
   
   $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
   $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
   $salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$"; /* salt contains 5000 rounds */
   $hashedPassword = crypt($password, $salt); /*hashedPassword variable containing crypt with password and salt variable*/
   
   $query = $_SESSION["connection"]->query("INSERT INTO users SET " /* this query has a session thats inserting into users*/
   	 . "email = '$email',"
   	 . "username = '$username',"
   	 . "password = '$hashedPassword',"
   	 . "salt = '$salt'"
       . "exp = 0,"
       . "exp1 = 0,"
       . "exp2 = 0,"
       . "exp3 = 0,"
       . "exp4 = 0");
   $_SESSION["name"] = $username;
   if($query) {     /*made an if statement for query*/
   	echo "true";  /* you see this if it works*/
      //Need this for Ajax om index.php
   }
   else {
   	    echo "<p>" . $_SESSION["connection"]->error . "</p>";
   }