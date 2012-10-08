<?php

	require_once('connect.php');

	mysql_select_db("db_name", $con);

	if (isset($_GET['project'])) {
		$project = $_GET['project'];
	}

	mysql_query("DELETE FROM projects WHERE project = '$project'");