<?php

error_reporting(-1);
ini_set('display_errors', 'On');

header("Access-Control-Allow-Headers: Authorization, Content-Type");
header("Access-Control-Allow-Origin: *");
header('content-type: application/json; charset=utf-8');

$postParams = json_decode(file_get_contents('php://input'), 1);

$action = $postParams['action'];
$payload = $postParams['payload'];

$connection = connect();

if ($action == 'get_hasuploaded') {
	getHasUploaded($connection, $payload['week'], $payload['user']);
} else if ($action == 'get_numbers') {
	getHasUploaded($connection, $payload['week'], $payload['user']);
// } else if ($action == 'add_entry') {
// 	createNewBlogEntry($connection);
// } else if ($action == 'delete_entry') {
// 	deleteBlogEntry($connection, $payload['id']);
// } else if ($action == 'update_entry') {
// 	updateBlogEntry($connection, $payload);
} else if ($action == 'get_all') {
	getAll($connection, $payload['week']);
} else if ($action == 'get_random') {
	$numbers = array(9,12,14,18,19,23,24,31,33,51,66,67,73,73,86);
	shuffle($numbers);
	$randomfiveKey = array_rand($numbers, 5);
	$randomfive = array_map(
	    function ($a) use ($numbers){ 
            return $numbers[$a]; 
    }, $randomfiveKey);
    sort($randomfive);
	echo json_encode($randomfive);
} else {
	echo 'Bad command or file name ^^';
}

closeConnection($connection);

// <--- listázók
function getHasUploaded($connection, $week, $user) {
	$sql = "SELECT
				*
			FROM
				numbers
			LEFT JOIN
				users
			ON
				numbers.family = users.family
			WHERE
				week = '$week'
			AND
				username = '$user'";

	$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

	$emparray = array();
	while($row =mysqli_fetch_assoc($result))
	{
		$emparray[] = $row;
	}
	echo json_encode($emparray);
}

function getAll($connection, $week) {
	$sql = "SELECT
				*
			FROM
				numbers
			WHERE
				week = '$week'";

	$result = mysqli_query($connection, $sql) or die("Error in Selecting " . mysqli_error($connection));

	$emparray = array();
	while($row =mysqli_fetch_assoc($result))
	{
		$emparray[] = $row;
	}
	echo json_encode($emparray);
}

function getBlogEntries($connection) {
	$sql = "SELECT
						*
					FROM
						blog_entries;";

	$result = mysqli_fetch_all(mysqli_query($connection, $sql), MYSQLI_ASSOC);

	foreach($result as $key=>$value){
		$result[$key]['picture'] = base64_encode($result[$key]['picture']);
	}

	echo json_encode($result);
}
// listázók vége --->

// <--- insert queryk
function createNewBlogEntry($connection) {
	$sql = "INSERT INTO
						blog_entries (title, nav_index, picture, picture_title, text, date)
					VALUES
						('', '', '', '', '', '');";

	if ($connection->query($sql) === TRUE) {
		echo $connection->insert_id;
	}
}
// insert queryk vége --->

// <--- delete queryk
function deleteBlogEntry($connection, $id) {
	$sql = "DELETE
					FROM
						blog_entries
					WHERE
						id = $id;";

	$result = mysqli_query($connection, $sql);
}
// delete queryk vége --->

// <--- update queryk
function updateBlogEntry($connection, $parameters) {
	$sql = "UPDATE
						blog_entries
					SET
						title = '".$parameters['title']."',
						nav_index = '".$parameters['nav_index']."',
						picture = '".$parameters['picture']."',
						picture_title = '".$parameters['picture_title']."',
						text = '".$parameters['text']."',
						date = '".$parameters['date']."'
					WHERE
						id = '".$parameters['id']."';";

	$result = mysqli_query($connection, $sql);
}
// update queryk vége --->

// <--- kapcsolódás függvények
function connect() {
	$dbhost = "localhost";
	$dbuser = "tajcohu1";
	$dbpass = "Amfm165L4h";
	$db = "tajcohu1_taj";
	
	$conn = new mysqli($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);

	return $conn;
}
 
function closeConnection($conn) {
	$conn -> close();
}
// kapcsolódás függvények vége --->


?>