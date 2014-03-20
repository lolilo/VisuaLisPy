// color procedure nodes

function editTree(){
    var nodes = $('.node');
    var i;
    // circle = document.getElementsByTagName("circle");
    // text = document.getElementsByTagName("text");
    console.log(nodes);
    for (i=0; i<nodes.length; i++){
        node = nodes[i];
        // console.log(node);
        circle = $(node).children('circle')[0];
        text = $(node).children('text')[0];

        if (text.innerHTML == '*'){
            $(circle).css('stroke', '#fff');
        }
        console.log(text.innerHTML);
    }

    // for (var i = 0; i < text.length; i++){
    //     node_label = (text[i].innerHTML);
    //     console.log(node_label);
    //     if (node_label == 'lambda'){
    //         text[i].innerHTML = "<b>lambda</b>";
    //         console.log('FIXED IT', text[i]);
    //     }
        // console.log(text[i]);
        // console.log(text[i]);
//     }
}

