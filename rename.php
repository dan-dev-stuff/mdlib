<?php 





function rename_this_file() {


    $here = getcwd() ;
    $fileName = $here.'/library/'.$_POST['fileName'];
    $newFileName = $here.'/library/'.$_POST['newFileName'];



        if ( file_exists($fileName) ){
            
            rename($fileName, $newFileName);
            return "renamed to ". $_POST['newFileName']; 
             

        } else {

            return "that file dosen't exist";

        }

};

rename_this_file();

