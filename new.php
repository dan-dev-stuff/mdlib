<?php 


$getFileName = $_POST['fileName'] || false;

if (!!$getFileName)  {return die("Please provide a file name");}

$here = getcwd();
$getFilePath = $here.'/library/'.$getFileName;

$newFile = fopen($getFilePath, "w") or die('Unable to make file');
		   fwrite($newFile, 'New mark down file');
		   fclose($newFile);

if (file_exists($getFilePath)) {
	return 'Success '.$getFilePath.' hase been created';
} else {
	return die("no file: $getFilePath");
}



