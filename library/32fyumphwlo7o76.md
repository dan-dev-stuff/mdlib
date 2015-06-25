##Set perms
    sudo chown -R danny:www-data .;
    sudo find ./ -type d -exec chmod 775 {} \;
    sudo find ./ -type f -exec chmod 664 {} \;
    sudo find ./ -type d -exec chmod g+s {} \;

##less libral
    sudo find ./ -type d -exec chmod 755 {} \; &amp;&amp; 
    sudo find ./ -type f -exec chmod 644 {} \; &amp;&amp; 
    sudo find ./ -type d -exec chmod g+s {} \;

##make it executable
    sudo chmod +x [/path/file]

##set owner
    sudo chown -R danny:www-data .;

