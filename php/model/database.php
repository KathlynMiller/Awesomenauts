<?php
class database { /* we need functions in our class that store in variables*/
	private $connection; /* these private variables are only to be access on this file*/
    private $host;   /* no other files can access this class*/
    private $username; /* these are member,instant,gobal variables*/
    private $password; /*a class is made with a new instance of an object that will be created and its name must be used when doing this*/
    private $database;
    public $error;
    public function __construct($host, $username, $password, $database) { /* the constructor is cotaining 4 variable from the database class*/
      $this->host = $host;         /*they all are storing their own gobal variables*/
      $this->username = $username;
      $this->password = $password;
      $this->database = $database;
    $this->connection = new mysqli($host, $username, $password);
    
    if($this->connection->connect_error) {
      die("<p>Error: " . $this->connection->connect_error . "</p>");
    }
    $exists = $this->connection->select_db($database); /* exists variable equals connection variable to select_db(database) */
    if(!$exists) {
   	    $query = $this->connection->query("CREATE DATABASE $database");
   	if($query) {
         echo "<p>successfully created database: " . $database ."</p>";   
   	    }
   
     }
    else {
    	echo "<p>Database already exists.</p>"; /*paragraph tags in echo */
     }
    }
    public function openConnection() {  /*this function is for opening our connection */
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database); /*copied from create-db.php file and contains a connection with its mysqli with variables from database class*/
        if($this->connection->connect_error) {
           die("<p>Error: " . $this->connection->connect_error . "</p>"); /*paragraphing my connection*/
        }
    }
    public function closeConnection() { /*this function is for closing our connection*/
    	if(isset($this->connection)) {       /*isset is checking the variable or it will turn null*/
    		$this->connection->close();    /*isset is checking $this->connection information*/
    	}
    }
    public function query($string) {   /*query function contains a string variable*/
    	$this->openConnection(); /*opening my connection*/
    	$query = $this->connection->query($string); /*query variable stores a connection containing a query with a string variable */
    	if(!$query) {     /*checking whether or not my query is true*/
    	 $this->error = $this->connection->error;
    	}
    	$this->closeConnection();    /*closing connection in query function*/
    	return $query;   /*returning my query */
        }
    }