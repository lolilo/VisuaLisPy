$(document).ready(function(){

    var formSubmitButton = $("#form_submit");
    var clearButton = $("#clear_program");

    formSubmitButton.on("click", function(event){
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/get_json",
            method: "POST",
            data: $("form#code_submission").serialize(),
            dataType: "json"
        }).done(function(data){
            var key;
            var env_functions = [];
            // get environment data
            // env = get_env(data);

            var env = data["trace"][0]["global_env"];
            // for (key in env){
            //     env_functions.push(key);
            // }
            console.log(env);

            var expressionTrace = data["trace"][1]["expression_trace"];
            // expressionTrace is the list object that contains one object for each line of code
            // for each object in expressionTrace, create a tree
            for (key in expressionTrace) {
                treeData = createTree(expressionTrace[key]);
                // console.log('this is tree', JSON.stringify(treeData));

                root = treeData[0];
                // call update function from render_tree.js
                messageArea = document.getElementById("message_display");
                messageArea.innerHTML = "";
                update(root); // renders tree in #tree div
                editTree(env); // custom edit tree
                $("svg").hide();
                $("svg").fadeIn(800);
            }

        }).fail(function(){
            failMessage = "Sorry, the given Scheme program is invalid or may contain an expression currently unsupported by VisuaLisPy. :(";
            messageArea = document.getElementById("message_display");
            messageArea.innerHTML = failMessage;
        });
    });

    clearButton.on("click", function(event){
        event.preventDefault();
        // clear any displayed message
        messageArea = document.getElementById("message_display");
        messageArea.innerHTML = "";
        // clear text area
        document.getElementById("user_input").value = "";
    });

    $("a").click(function(event){
        var link = $(this).attr('href');
        // console.log(this);
        // console.log(link);

        if (link == "/about" || link == "/"){
            return;
        }
        else{
            event.preventDefault();
            // console.log(event.currentTarget === this);
            document.getElementById("message_display").value = "";
            $.ajax({
                url: link,
                method: "GET"
                // gets a program as a string
            }).done(function(data){
                code = data;
                document.getElementById("user_input").value = code;
            }).fail(function(){
                console.log("fail. :(");
            });
        }
    });
});



