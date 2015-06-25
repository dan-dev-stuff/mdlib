<?php

 function fileList() {

	$path = './library/';
	$listStr = '<div class="list">';
	$listStr .= '<div><h3>File library <i id="fileAdd" class="fa fa-plus-square"></i></h3></div>';

	$files = array_diff(scandir($path), array('..', '.'));

	foreach ($files as $key => $value) {
		
		$listStr .= "<div class='fileurl' data-filelink='$value'>$value <i class='fa fa-file-code-o'></i></div>";

	};
	//$listStr .= '<div id="fileToSave">Save <i class="fa fa-floppy-o"></i></div>';
	$listStr .= '</div>';

	return $listStr;
}


echo fileList();