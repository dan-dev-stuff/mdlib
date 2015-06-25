
js random string

    Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 36);

js dates

    var today = new Date();
    var getDay = today.getUTCDate();
    var getMonth = today.getUTCMonth();
    var getYear = today.getUTCFullYear();
    var getMinute = today.getUTCMinutes();
    var getHours = today.getUTCHours();
    var todaysdate = (getMinute+':'+getHours+'_'+getDay+'-'+getMonth+'-'+getYear);

toggle class (all same line)

    document.getElementById("MyElement").className =
    document.getElementById("MyElement").className.
    replace( /(?:^|\s)MyClass(?!\S)/g , '' );

