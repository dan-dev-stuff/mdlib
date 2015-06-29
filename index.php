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
  <div id="fileList"></div>
</div>
<div id="mainBlock" class="col main">
  <div id="header">
   <input id="mainTitle" type="text" value="Select a file..."> 
   <i id="editToggle" class="fa fa-pencil-square-o" title="Edit"></i>
   <i id="fullScreen" class="fa fa-expand" title="Full screen view"></i>
   <i id="fileToSave" class="fa fa-floppy-o" title="Save file"></i>
   </div>
   </h3>
	 <div id="epiceditor"></div>
   <div id="intro"><h2>Markdown editor</h2>
   <p>
     This is a proof of concept i've been working on to edit markdown files,<br/>

     a bit like Wikitten but i wanted to be able to add, remove and rename the files.
</p><p>
     <i>NOTE: this is only ment for use on an local server, security is in my to-do list (below)</i>
   </p>
   
    <ul>
    <li><strong>To-do:</strong></li>
    <li>Styling: it's just a prototype so far.</li>
    <li>Add a file search.</li>
    <li>Add key bindings (ctrl+s = save etc).</li>
    <li>Add github gist support (or similar would be nice)</li>
    <li>Make secure for a production server, writing to the file system and alowing file renaming isn't very safe</li>
    <li>Refactor for mongodb and mysql</li>
    <li>Tidy up code, refactor refartor refactor...</li>
</ul>

   </div>
</div>

      </div>
      </div>


        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script src="js/lib/EpicEditor-v0.2.2/js/epiceditor.js"></script>
        <script src="js/main.js"></script>





</html>
