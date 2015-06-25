<?php 

$here = getcwd() ;
$fileName = $here.'/library/'.$_POST['fileName'];
$newFileName = $here.'/library/'.$_POST['newFileName'];


if (isset($_POST['fileName']) && isset($_POST['newName'])){


function rename_this_file() {

    global $fileName, $newFileName;

    if ($result == 0 && !file_exists($fileName) && file_exists($newFileName)){
        
        @unlink($newFileName);
        echo "eio_rename_ok";

    } else {

        @unlink($fileName);

    }

};

eio_rename($fileName, $newFileName, EIO_PRI_DEFAULT, "rename_this_file",$fileName);
eio_event_loop();

}