<?php

/* function fileList() {

	$path = './library/';
	$listStr = '<div class="list">';
	$listStr .= '<div><h3>File library <i id="fileAdd" class="fa fa-plus-square"></i></h3></div>';

	$files = array_diff(scandir($path), array('..', '.'));

	foreach ($files as $key => $value) {
		
		$listStr .= "<div class='fileurl' data-filelink='/$value'>$value <i class='fa fa-file-code-o'></i></div>";

	};
	$listStr .= '<div id="fileToSave">Save <i class="fa fa-floppy-o"></i></div>';
	$listStr .= '</div>';

	return $listStr;
}*/

?>


<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang=""> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang=""> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang=""> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang=""> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="js/lib/font-awesome-4.3.0/css/font-awesome.min.css">
        <link type="text/css" rel="stylesheet" href="js/lib/EpicEditor-v0.2.2/themes/editor/epic-dark.css" media="screen">
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
      <div class="wrapper">
      <div class="container">

<div class="col side">
	<?php //echo fileList(); ?>
  <div id="fileList"></div>
</div>
<div class="col main">
  <h3 id="mainTitle" class="title"><span>&nbsp;</span> 
   <i id="editToggle" class="fa fa-pencil-square-o" title="Edit"></i>
   <i id="fullScreen" class="fa fa-expand" title="Full screen view"></i>
   <i id="fileToSave" class="fa fa-floppy-o" title="Save file"></i>
   </h3>
	 <div id="epiceditor"></div>
</div>

      </div>
      </div>


        <!--
        <script src="js/vendor/bootstrap.min.js"></script>
        <script src="js/plugins.js"></script>
        --> 

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/lib/jquery-1.11.3.min.js"><\/script>')</script>


        <script src="js/lib/EpicEditor-v0.2.2/js/epiceditor.js"></script>
        <script src="js/main.js"></script>


</html>
