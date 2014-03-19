$(document).ready(function(){

    var formSubmitButton = $("#form_submit");

    formSubmitButton.on("click", function(event){
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/get_json",
            method: "POST",
            data: $("form#code_submission").serialize(),
            dataType: "json"
        }).done(function(data){
            expressionTrace = data["trace"][1]["expression_trace"];
            // expressionTrace is the list object that contains one object for each line of code
            // for each object in expressionTrace, create a tree
            for (var key in expressionTrace) {
                treeData = createTree(expressionTrace[key]);
                // console.log('this is tree', JSON.stringify(treeData));

                root = treeData[0];
                // call update function from render_tree.js
                messageArea = document.getElementById("message_display");
                messageArea.innerHTML = "";
                update(root); // renders tree in #tree div
            }

        }).fail(function(){
            failMessage = "Sorry, the given Scheme program is invalid or may contain an expression currently unsupported by VisuaLisPy. :(";
            messageArea = document.getElementById("message_display");
            messageArea.innerHTML = failMessage;
        });
    });

    $("a").click(function(event){
        event.preventDefault();
        // console.log(event.currentTarget === this);
        var link = $(this).attr('href');
        // console.log(this);
        // console.log(link);
        $.ajax({
            url: link,
            method: "GET"
            // gets a program as a string
        }).done(function(data){
            code = data;
            document.getElementById("user_input").innerHTML = code;
        }).fail(function(){
            console.log("fail. :(");
        });
    });
});



