# mdlib
##A basic wiki using mark down files
This is a proof of concept i've been working on to edit markdown files, a bit like Wikitten but i wanted to be able to add, remove and rename the files (to rename a file select the name top left, retype then save as normal).



Remember to chown the library contents, if you set the user to your self and the group to what ever your webserver is using, that should allow you to edit the files

###NOTE: this is only ment for use on an local server, security is in my to-do list (below)

##To-do:
   * Styling: including responcivity, it's just a prototype so far.
   * Add a file search.
   * The UI needs attention its not obviouce how to rename a file for instance.
   * Add key bindings (ctrl+s = save etc).
   * Add github gist support (or similar would be nice).
   * Make secure for a production server, writing to the file system and alowing file renaming isn't very safe
   * Refactor for mongodb and mysql.
   * Tidy up code, refactor refartor refactor...
   
