<?php

	require_once('connect.php');

	mysql_select_db("work_list", $con);

	function getProjects() {
		$result = mysql_query("SELECT * FROM projects ORDER BY project_order");
		echo "<ul class='projects'>\n";
		while ($row = mysql_fetch_array($result)) {
			echo "<li>".$row['project']."</li>\n";
		}
		echo "</ul>";
	}

