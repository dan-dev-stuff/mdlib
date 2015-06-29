<?php 


$getFileName = $_POST['fileName'];

if (!isset($getFileName))  {return die("Please provide a file name");}

$here = getcwd();
$getFilePath = $here.'/library/'.$getFileName;

if (file_exists($getFilePath)) {
	unlink($getFilePath);
	return 'Success '.$getFilePath.' hase been removed';

} else {
	return die("no file: $getFilePath");
}



