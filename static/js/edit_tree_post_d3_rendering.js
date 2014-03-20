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
        // must decode special characters, if there are any
        // This sets the innerHTML of a new element (not appended to the page), 
        // causing jQuery to decode it into HTML, 
        // which is then pulled back out with .text().
        decoded = $("<div/>").html(text.innerHTML).text();

        if (env[decoded]){
            $(circle).css('stroke', '#00CC00');
        }
    }
}

