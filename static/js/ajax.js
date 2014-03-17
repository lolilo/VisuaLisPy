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
            // console.log(typeof(data));
            expressionTrace = data["trace"][1]["expression_trace"];
            console.log(expressionTrace);
            for (var key in expressionTrace) {
                console.log(expressionTrace);
            }
            

            // tree = createTree(data);
            // console.log('this is tree', tree);
            // n = depthFirstTraversal(tree);
            // console.log('traversal', n);





        }).fail(function(){
            console.log('fail!!!');
        });

    });
});



