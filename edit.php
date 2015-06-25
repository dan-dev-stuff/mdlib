<?php 

$here = getcwd() ;
$getFileName = $here.'/library/'.$_POST['fileName'];

if (isset( $_POST['str'] )) {
	
	$getStr = $_POST['str'];

} else {

	$getStr = 'New file';

}

if (!isset($_POST['fileName'])) {
   $getFileName = $here.'/library/'.random_string(15).'.md';
}

$file = fopen($getFileName, "w") or die("can't open file: $getFileName");

fwrite($file, $getStr);

fclose($file);

echo $getFileName;


function random_string($length) {
    $key = '';
    $keys = array_merge(range(0, 9), range('a', 'z'));

    for ($i = 0; $i < $length; $i++) {
        $key .= $keys[array_rand($keys)];
    }

    return $key;
}