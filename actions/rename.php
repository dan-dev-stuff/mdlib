<?php 





function rename_this_file() {


    $here = getcwd() ;
    $fileName = '../library/'.$_POST['fileName'];
    $newFileName = '../library/'.$_POST['newFileName'];



        if ( file_exists($fileName) ){
            
            rename($fileName, $newFileName);
            return "renamed to ". $_POST['newFileName']; 
             

        } else {

            return "that file dosen't exist";

        }

};

rename_this_file();

