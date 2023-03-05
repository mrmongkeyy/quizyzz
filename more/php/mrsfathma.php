<?php
	$mode = $_GET['mode'];
	switch($mode){
		case 'read':
			include 'module.php';
			$key = $_GET['qid'];
			$data = read();
			echo json_encode($data[$key],true);
			break;	
		case 'getansofthis':
			include 'module.php';
			$key = $_GET['key'];
			$data = read();
			echo json_encode($data[$key]['answer'],true);
	}
?>