<?php
  require_once(__DIR__ . "/database.php");
  session_start();
  session_regenerate_id(true);
  $path="/Awesomenauts/php/"; /* path variable  contains blog folder*/
  $host = "localhost";
  $username = "root";
  $password = "root";
  $database = "awesomenauts_db";
  
  if(!isset($_SESSION["connection"])) {
       $connection = new database($host, $username, $password, $database);  /* connection variable equals new mysqli containing $host, $username, $passowrd, $database variables */
       $_SESSION["connection"] = $connection; /*this makes the "Database already exists" on post.php disappear*/
  }