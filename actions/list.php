<?php

function fileList() {

	$path = '../library/';

	$files = array_diff(scandir($path), array('..', '.'));

	return json_encode($files);
}

echo '{"files":'.fileList().'}';