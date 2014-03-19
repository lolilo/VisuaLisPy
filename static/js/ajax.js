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
                // console.log('in the for loop', expressionTrace[key]);
                treeData = createTree(expressionTrace[key]);
                console.log('this is tree', JSON.stringify(treeData));

                root = treeData[0];
                // call update function from render_tree.js
                message_area = document.getElementById("message_display");
                message_area.innerHTML = "";
                update(root); // renders tree in #tree div
            }

        }).fail(function(){
            fail_message = "Sorry, your Scheme program is invalid or may contain an expression currently unsupported by VisuaLisPy.";
            message_area = document.getElementById("message_display");
            message_area.innerHTML = fail_message;
            // console.log(fail_message);
        });
    });
});



