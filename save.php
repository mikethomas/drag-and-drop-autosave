<?php

	require_once('connect.php');

	mysql_select_db("db_name", $con);

	if (isset($_GET['project'])) {
		$project = $_GET['project'];
	}
	if (isset($_GET['project_order'])) {
		$project_order = $_GET['project_order'];
	}

	mysql_query("REPLACE INTO projects SET project_order = '$project_order', project = '$project'");
