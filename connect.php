<?php
	$con = mysql_connect("localhost", "username", "password");
	if (!$con) {
		die("Could not connect: " . mysql_error());
	}