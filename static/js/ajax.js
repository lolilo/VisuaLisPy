var env = {};

$(document).ready(function(){
    var formSubmitButton = $("#form_submit");
    var clearButton = $("#clear_program");
    var drawTree = function(data){
        var key;
        // get environment data
        // console.log(JSON.stringify(data, null, '\t'));
        env = data["trace"][0]["global_env"];
        // console.log(env);
        var expressionTrace = data["trace"][1]["expression_trace"];
        // expressionTrace is the list object that contains one object for each block of code
        // for each object in expressionTrace, create a tree


// I need to reorganize my if statement...maybe?


        for (key in expressionTrace) {
            jsElement = expressionTrace;
            console.log(JSON.stringify(jsElement, null, '\t'));
            // treeData = createJSD3TreeFormat(jsElement);

            // // TODO: this is unncessary work, checking each time
            if (jsElement[0][0] == "stmt" || jsElement[0][0] == "function") {
                // console.log("JAVASCRIPT");
                treeData = createJSD3TreeFormat(jsElement);
            }
            else {
                // console.log("THIS IS NOT JAVASCRIPT");
                treeData = createSchemeD3TreeFormat(expressionTrace[key]);
            }
            console.log('this is tree', JSON.stringify(treeData, null, '\t'));

            root = treeData[0];
            // call update function from render_tree.js
            messageArea = document.getElementById("message_display");
            messageArea.innerHTML = "";

            // clear canvas
            if (svg.selectAll("g")){
                svg.selectAll("g").remove();
                svg.selectAll("path").remove();
            }
            renderTree(root); // renders tree in #tree div
            // $("svg").hide();
            // $("svg").fadeIn(800);
        }
    };

    formSubmitButton.on("click", function(event){
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/get_json",
            method: "POST",
            data: $("form#code_submission").serialize(),
            dataType: "json"
            // when ajax call occurs, sets both callback functions
            // not like an if statement where either or runs
        }).done(drawTree
            // Why can't I just have drawTree--need to extract data via anonymous function?
            // drawTree(data); this breaks because 
            // data is not yet defined when ajax tries to set the callback 
            // and we attempt to run drawTree
        ).fail(function(){
            failMessage = "Sorry, the given Scheme program is invalid or may contain an expression currently unsupported by VisuaLisPy. :(";
            messageArea = document.getElementById("message_display");
            messageArea.innerHTML = failMessage;
        });
    });

    // debugging -- autoclick
    formSubmitButton.click();


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

