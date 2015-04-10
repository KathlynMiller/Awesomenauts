<?php
    require_once(__DIR__ . "/../model/config.php"); /*adding config.php file*/
    function authenticateUser() {
    	if(!isset($_SESSION["authenticated"])) { /*always put !isset*/
    		return false;
    	}
    	else {
    		if($_SESSION["authenticated"] != true) { /*needs to be true not false for the session to work*/
    			return false;
    		}
    		else {
    			return true;
    		}
    	}
    }