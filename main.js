if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
};

var search = window.location.search;
var textarea = document.getElementById("text");

if( search.indexOf('?t=') !== -1 )
{
    var words = decodeURIComponent(search.replace('\?t=','')).replace(/\\n/g,"\n").split('%20');
    textarea.value = decodeURIComponent(search.replace('\?t=','')).replace(/\\n/g,"\n").replace(/%20/g,' ');
    processWords(words);
}

textarea.addEventListener("keyup", processWords, false);

function processWords(words)
{
    if( typeof(words) !== "Array" )
    {
        var sentence = document.getElementById("text").value;
        var words = sentence.split(" ");
    }
    var output = '';
    var url = window.location.origin+'/~dustin/ilo-nimi/?t=';

    for( x in words )
    {
        if( words[x] != '' )
        {
            if( words[x].indexOf("\n") !== -1 )
            {
                url += (x!=0?'%20':'')+encodeURIComponent(words[x].replaceAll('\n','\\n'));
            }
            else
            {
                url += (x!=0?'%20':'')+encodeURIComponent(words[x]);
            }
        }
    }

    output = '<p>Permalink: <a href="'+url+'">'+url+'</a></p>';

    window.history.replaceState( {} , '', url );

    document.getElementById("output").innerHTML = output;
}
