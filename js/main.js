/*
 *
 *Class to list and edit mark down
 * used EpicEditor - An Embeddable JavaScript Markdown Editor (https://github.com/OscarGodson/EpicEditor)
 * and a serverside component to save data [edit.php] 
 *
 */



var mdEditor = (function() {

    var removeUrlStr = '/remove.php';
    var editUrlStr = '/edit.php';
    var listUrlStr = '/list.php';

    var fileurls = document.getElementsByClassName("fileurl");
    var fileToSaveBtn = document.getElementById("fileToSave");
    var fileAdd = document.getElementById("fileAdd");
    var fileListStr = document.getElementById("fileList");
    var mainTitleStr = document.getElementById("mainTitle").getElementsByTagName("span")[0];
    var fullscreenBtn = document.getElementById("fullScreen");
    var editToggleBtn = document.getElementById("editToggle");

    //privates variables
    var opts = {
        container: 'epiceditor',
        textarea: null,
        basePath: 'js/lib/EpicEditor-v0.2.2',
        clientSideStorage: true,
        localStorageName: 'md',
        useNativeFullscreen: true,
        parser: marked,
        autogrow: true,
        autoSave: true,

        theme: {
            base: '/themes/base/epiceditor.css',
            preview: '/themes/preview/nice-and-dark.css',
            editor: '/themes/editor/epic-dark.css'
        },
        button: {
            preview: false,
            fullscreen: false,
            bar: "hide"
        },
        focusOnLoad: true,
        shortcut: {
            modifier: 18,
            fullscreen: 70,
            preview: 80
        },
        string: {
            togglePreview: 'Toggle Preview Mode',
            toggleEdit: 'Toggle Edit Mode',
            toggleFullscreen: 'Enter Fullscreen'
        },
    };

    //init md editor
    var editor = new EpicEditor(opts);
    editor.load(function() {

        console.log("Editor loaded.");
        console.log(editor.settings.file.name);

    });

    /*
     * get list html
     * 
     */
    var getFileList = function() {

        //import the file
        $.get(listUrlStr, function(data) {

            //reload list 
            fileListStr.innerHTML = data;

            //reset vars
            mdEditor.fileurls = document.getElementsByClassName("fileurl");
            mdEditor.fileToSaveBtn = document.getElementById("fileToSave");
            mdEditor.fileAdd = document.getElementById("fileAdd");
            mdEditor.fileListStr = document.getElementById("fileList");
            mdEditor.mainTitleStr = document.getElementById("mainTitle").getElementsByTagName("span")[0];
            mdEditor.fullscreenBtn = document.getElementById("fullScreen");
            mdEditor.editToggleBtn = document.getElementById("editToggle");


            //Adds file open listerners
            setAddEventListeners();

        });

    };


	/*
	 * file new action
	 */
	var fileAddonclick = function() {


        $.ajax({
            type: "POST",
            url: editUrlStr,
            success: ( function(data) {

                    console.log('Success added: ' + data);
                    getFileList();

            })
        });


	};



    /*
     *  file click listener loop
     */
    var setAddEventListeners = function() {

        for (var i = 0; i < fileurls.length; i++) {

            var _thisFile = fileurls[i];

            _thisFile.addEventListener('click', fileClickAction, false);

        }



        mdEditor.fileToSaveBtn.addEventListener('click', fileClickSave, false);
        mdEditor.fileAdd.addEventListener('click', fileAddonclick, false);

        mdEditor.fullscreenBtn.addEventListener('click', fullscreenAction, false);
        mdEditor.editToggleBtn.addEventListener('click', editToggleAction, false);




    };




    /*
     * open file on click action
     */
    var fileClickAction = function(e) {

        //asign the data-filelink string
        var fileName = editor.settings.file.name;

        if (!!e) {

            fileName = e.target.dataset.filelink;

        }


        //import the file
        $.get('/library/' + fileName, function(data) {
            //editor.remove(fileName);
            editor.importFile(fileName, data);
            editor.preview();

            //update the file title
            mainTitleStr.innerHTML = fileName;

            //console.log(data);
        });

    };



    /*
     * file save action
     */
    var fileClickSave = function() {

        var theContent = editor.exportFile();
        var theFileName = editor.settings.file.name;

        $.ajax({
            type: "POST",
            url: editUrlStr,
            data: {
                'str': theContent,
                'fileName': theFileName
            },
            success: (
                function() {

                    console.log('Success saved to: ' + theFileName);
            		editor.preview();

                })
        });

    };



    /*
     * edit in full screen
     * 
     */
    var fullscreenAction = function(e) {


        editor.exitFullscreen();

    };

    var editToggleAction = function(e) {

        if (editor.is('preview')) {

            editor.edit();

            e.target.className = e.target.className.replace(/(?:^|\s)fa-pencil-square-o(?!\S)/g, ' fa-eye');
            e.target.title = 'Preview';

        } else {

            editor.preview();

            e.target.className = e.target.className.replace(/(?:^|\s)fa-eye(?!\S)/g, ' fa-pencil-square-o');
            e.target.title = 'Edit';
        }


    };




    // Return an object exposed to the public
    return {

        init: (function() {

            $.ajaxSetup({
                cache: false,
                mimeType: "text/plain"
            });


            getFileList(); //pull in file list




            // _fileUrlOnClickAction();

            //setUpFileOpenClicks();
            //initListeners();




        })




    };
})();




/*
 * open initial file action
 */
/*   var openInitfile = function(e) {

        //asign the data-filelink string
        var fileName = editor.settings.file.name;

        if (fileName === 'epiceditor') {
            return null;
        }
        //import the file
        $.get('/library' + fileName, function(data) {
            //editor.remove(fileName);
            editor.importFile(fileName, data);
            editor.preview();
            console.log(data);
        });

    };/*




    editor.on('autosave', function() {

        fileSaveonclick();

    });



    /*var setUpFileRemoveClicks = function(e) {

  			//editor.remove(name);

			var theFileName = editor.settings.file.name;

			 
			$.ajax({
			  type: "POST",
			  url: removeUrlStr,
			  data: { str:theContent, fileName: theFileName },
			  success: ( function(){ console.log('Successfully removed: '+theFileName);} ) 
			});


	}*/




//call on load
document.addEventListener('DOMContentLoaded', mdEditor.init, false);
//mdEditor();
