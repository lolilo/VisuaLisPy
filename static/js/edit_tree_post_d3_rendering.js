// color procedure nodes

function editTree(){
    nodes = document.getElementsByClassName("node");
    circle = document.getElementsByTagName("circle");
    text = document.getElementsByTagName("text");
    // console.log(nodes);
    // for (var i in nodes){
    //     console.log(nodes[i]);
    //     // console.log(circle);
    // }

    for (var i = 0; i < text.length; i++){
        node_label = (text[i].innerHTML);
        console.log(node_label);
        if (node_label == 'lambda'){
            text[i].innerHTML = "<b>lambda</b>";
            console.log('FIXED IT', text[i]);
        }
        // console.log(text[i]);
        // console.log(text[i]);
    }
}


