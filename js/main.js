/*
 *
 * self initing class to list and edit mark down
 * used EpicEditor - An Embeddable JavaScript Markdown Editor (https://github.com/OscarGodson/EpicEditor)
 * and a serverside component to save data [edit.php] 
 *
 */

/*
mdEditor.fileListAction() : now using handlbars
mdEditor.fileNewAction()
mdEditor.setAddEventListeners()
mdEditor.fileOpenAction()
mdEditor.fileSaveAction()
mdEditor.fileClickRemove()
mdEditor.fileRenameAndSave()
mdEditor.fullScreenAction()
mdEditor.editToggleAction()
*/


var mdEditor = (function() {

    /******************/

    var listUrlStr = '/actions/list.php'; //list all files in library
    var removeUrlStr = '/actions/remove.php'; //remove a file
    var editUrlStr = '/actions/edit.php'; //add a new file or 
    var renameUrlStr = '/actions/rename.php'; //rename file

    //class elements
    var fileurls = document.getElementsByClassName("fileurl");
    var fileurlsRenameBtns = document.getElementsByClassName("fa-file-code-o");
    var fileurlsRemoveBtns = document.getElementsByClassName("fa-remove");

    //id elements
    var fileToSaveBtn = document.getElementById("fileToSave");
    var fileAdd = document.getElementById("fileAdd");
    var fileListStr = document.getElementById("fileList");
    var mainTitleStr = document.getElementById("mainTitle");
    var fullscreenBtn = document.getElementById("fullScreen");
    var editToggleBtn = document.getElementById("editToggle");
    var headerBlock = document.getElementById("header");
    var introBlock = document.getElementById("intro");
    var mainBlock = document.getElementById("mainBlock");

    // Retrieve the template data from the HTML (jQuery is used here).
    var listTpl = $('#listTemplate').html();
    // Compile the template data into a function
    var templateScript = Handlebars.compile(listTpl);
                          

    //epiceditor variables
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


    /******************/

    /*
     * get list html
     */
    var fileListAction = function() {

        $.ajax({
            type: "POST",
            url: listUrlStr,
            dataType: 'json',
            success: (function(data) {

            //handlebars template
            fileListStr.innerHTML = templateScript(data);
            
            //reset vars
            mdEditor.fileurls = document.getElementsByClassName("fileurl");
            mdEditor.fileurlsRenameBtns = document.getElementsByClassName("fa-file-code-o");
            mdEditor.fileurlsRemoveBtns = document.getElementsByClassName("fa-remove");
            mdEditor.fileToSaveBtn = document.getElementById("fileToSave");
            mdEditor.fileAdd = document.getElementById("fileAdd");
            mdEditor.fileListStr = document.getElementById("fileList");
            mdEditor.mainTitleStr = document.getElementById("mainTitle");
            mdEditor.fullscreenBtn = document.getElementById("fullScreen");
            mdEditor.editToggleBtn = document.getElementById("editToggle");

            //Adds file open listerners
            setAddEventListeners();

            })
        });

    };


    /*
     * adds a new file (just hits edit.php ...not secure needs something like: http://fullthrottledevelopment.com/php-nonce-library)
     */
    var fileNewAction = function() {


        $.ajax({
            type: "POST",
            url: editUrlStr,
            success: (function(data) {

                console.log('Success added: ' + data);
                fileListAction();

            })
        });


    };


    /*
     *  file click listener loop
     */
    var setAddEventListeners = function() {


        //open action added to all file buttons
        for (var i = 0; i < fileurls.length; i++) {

            var _thisFile = fileurls[i];

            _thisFile.addEventListener('click', fileOpenAction, false);

        }

        //remove action added to all file buttons
        for (var y = 0; y < fileurlsRemoveBtns.length; y++) {

            var _fileurlsRemoveBtns = fileurlsRemoveBtns[y];

            _fileurlsRemoveBtns.addEventListener('click', fileClickRemove, false);

        }


        mdEditor.fileToSaveBtn.addEventListener('click', fileRenameAndSave, false);
        mdEditor.fileAdd.addEventListener('click', fileNewAction, false);
        mdEditor.fullscreenBtn.addEventListener('click', fullScreenAction, false);
        mdEditor.editToggleBtn.addEventListener('click', editToggleAction, false);



    };




    /*
     * open file on click action
     */
    var fileOpenAction = function(e) {

        //assign the data-filelink string
        var fileName = editor.settings.file.name;

        if (!!e) {

            fileName = e.target.dataset.filelink;

        }


        editor.load(function() {

            console.log("Editor loaded.");
            console.log(editor.settings.file.name);
            headerBlock.style.display = "block";
            introBlock.style.display = "none";

        });


        $.ajax({
            type: "POST",
            url: '/library/' + fileName,
            success: (function(data) {

            if (!!editor) {

                editor.load(function() {
                    console.log("Editor loaded.");
                });

            }

            editor.importFile(fileName, data);
            editor.preview();

            //update the file title
            mainTitleStr.value = fileName;

        })
    });

        return fileName;

    };



    /*
     * file save action
     */
    var fileSaveAction = function() {

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
     * file save action
     */
    var fileClickRemove = function(e) {

        fileOpenAction(e);

        //asign the data-filelink string
        var fileName = editor.settings.file.name;

        if (!!e) {

            fileName = e.target.dataset.filelink;

        }


        $.ajax({
            type: "POST",
            url: removeUrlStr,
            data: {
                'fileName': fileName
            },
            success: (
                function(data) {

                    fileListAction();
                    mainTitleStr.value = 'Select a file...';
                    editor.unload(function() {
                        console.log("Editor unloaded.");
                    });


                })
        });

    };


    /*
     * file save action or rename file
     */
    var fileRenameAndSave = function() {

        fileSaveAction(); //saves contents

        var theContent = editor.exportFile();
        var fileName = editor.settings.file.name;

        if (mainTitleStr.value.length === 0) {
            console.log('What happened to my new file name!');
            return null;
        }

        //rename file
        $.ajax({
            type: "POST",
            url: renameUrlStr,
            data: {
                'newFileName': mainTitleStr.value,
                'fileName': fileName
            },
            success: (
                function(data) {

                    fileListAction();
                    editor.settings.file.name = mainTitleStr.value;
                    fileOpenAction();
                    console.log(data);

                })
        });

    };



    /*
     * edit in full screen
     */
    var fullScreenAction = function(e) {
        editor.exitFullscreen();

    };


    /*
     * toggle preview/Edit
     */
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

            //settings for ajax (note: remove when i purge jquery)
            $.ajaxSetup({
                cache: false,
                mimeType: "text/plain"
            });


            //pull in file list
            fileListAction();

        })




    };
})();


document.addEventListener('DOMContentLoaded', mdEditor.init, false);


Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);
 
  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    console.log(optionalValue);
  }
});