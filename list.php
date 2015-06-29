<?php

 function fileList() {

	$path = './library/';
	$listStr = '<div class="list">';
	$listStr .= '<div><h3>File library <i id="fileAdd" class="fa fa-plus-square" title="Add a new file"></i></h3></div>';

	$files = array_diff(scandir($path), array('..', '.'));

	foreach ($files as $key => $value) {
		
		$listStr .= "<div class='fileurl' title='Select $value' data-filelink='$value'>$value  <i class='fa fa-remove' data-filelink='$value' title='Delete file'></i></div>";

	};
	$listStr .= '</div>';

	return $listStr;
}


echo fileList();