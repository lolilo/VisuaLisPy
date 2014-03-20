// color procedure nodes

function editTree(env){
    var nodes = $('.node');
    var i;
    // circle = document.getElementsByTagName("circle");
    // text = document.getElementsByTagName("text");

    for (i=0; i<nodes.length; i++){
        node = nodes[i];
        // console.log(node);
        circle = $(node).children('circle')[0];
        text = $(node).children('text')[0];

        if (env[text.innerHTML]){
            $(circle).css('stroke', '#00CC00');
        }
        // console.log(text.innerHTML);
    }
}

