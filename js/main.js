/*
 *
 * self initing class to list and edit mark down
 * used EpicEditor - An Embeddable JavaScript Markdown Editor (https://github.com/OscarGodson/EpicEditor)
 * and a serverside component to save data [edit.php] 
 *
 */


var mdEditor = (function() {

    var removeUrlStr = '/remove.php';
    var editUrlStr = '/edit.php';
    var listUrlStr = '/list.php';
    var renameUrlStr = '/rename.php';

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

        });

    };


/*
    var changeMenu = function() {

console.log('scroll');
    var scrollBarPosition = window.pageYOffset | document.body.scrollTop;

        if(scrollBarPosition === 0) {

            console.log("User is on top of the page, position=" + scrollBarPosition);

        } else {

            console.log("User is not on top of the page, position="  + scrollBarPosition);

        }
    };
*/

    /*
     * file new action
     */
    var fileAddonclick = function() {


        $.ajax({
            type: "POST",
            url: editUrlStr,
            success: (function(data) {

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


        for (var y = 0; y < fileurlsRemoveBtns.length; y++) {

            var _fileurlsRemoveBtns = fileurlsRemoveBtns[y];

            _fileurlsRemoveBtns.addEventListener('click', fileClickRemove, false);

        }


        mdEditor.fileToSaveBtn.addEventListener('click', fileClickSaveOrRename, false);
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


    editor.load(function() {

        console.log("Editor loaded.");
        console.log(editor.settings.file.name);
        headerBlock.style.display="block";
        introBlock.style.display="none";
    });

        //import the file
        $.get('/library/' + fileName, function(data) {
            
        if (!!editor) {
            editor.load(function () {
              console.log("Editor loaded.");
            });
        }
            editor.importFile(fileName, data);
            editor.preview();

            //update the file title
            mainTitleStr.value = fileName;

            //console.log(data);
        });

        return fileName;

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
     * file save action
     */
    var fileClickRemove = function(e) {

        fileClickAction(e);

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

                    getFileList();
                    mainTitleStr.value = 'Select a file...';
                    editor.unload(function () {
                      console.log("Editor unloaded.");
                    });


                })
        });

    };


    /*
     * file save action
     */
    var fileClickSaveOrRename = function() {


            var theContent = editor.exportFile();
            var fileName = editor.settings.file.name;
            console.log(mainTitleStr.value.length);


            if (mainTitleStr.value.length === 0) {
                console.log('What happened to my new file name!');
                return null;
            }

            $.ajax({
                type: "POST",
                url: renameUrlStr,
                data: {
                    'newFileName': mainTitleStr.value,
                    'fileName': fileName
                },
                success: (
                    function(data) {

                        getFileList();
                        editor.settings.file.name = mainTitleStr.value;
                        fileClickAction();
                        console.log(data);

                    })
            });

    };


    /*
     * edit in full screen
     */
    var fullscreenAction = function(e) {   editor.exitFullscreen();   };




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

            //settings for ajax note: remove when i purge jquery
            $.ajaxSetup({
                cache: false,
                mimeType: "text/plain"
            });


            //pull in file list
            getFileList(); 


        //window.addEventListener('scroll', mdEditor.changeMenu, false);




        })




    };
})();


document.addEventListener('DOMContentLoaded', mdEditor.init, false);


