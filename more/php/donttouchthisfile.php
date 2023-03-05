<?php
	$edit = $_GET['edit'];
	include 'module.php';
	function putthisq($string){
		$data = json_decode($string,true);
		$olddata = read();
		foreach($data as $key=>$value){
			$olddata[$key] = $value;
		}
		write(json_encode($olddata));
	}
	function putthisa($string){
		$data = json_decode($string,true);
		$olddata = read();
		$olddata[$data['key']]['answer'][count($olddata[$data['key']]['answer'])] = $data;
		write(json_encode($olddata));
	}
	$data = file_get_contents('php://input');
	if($edit==='q'){
		putthisq($data);
	}else if($edit==='a'){
		putthisa($data);
	}
?>