<?php
function read(){
	$url = '../db/dbaquizozz.json';
	$file = fopen($url,'r');
	$data = fread($file,filesize($url));
	fclose($file);
	return json_decode($data,true);
}
function write($string){
	$url = '../db/dbaquizozz.json';
	$file = fopen($url,'w');
	fwrite($file,$string);
	fclose($file);
	echo 'ok';
}
?>