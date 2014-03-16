$(document).ready(function(){
    var listSubmitButton = $("#form_submit");

    listSubmitButton.on("click", function(event){
        event.preventDefault(); // prevent the browser form submission from happening
        $.ajax({
            url: "/",
            method: "POST",
            data: $("form#todo_list_form").serialize(),
        }).done(function(data){
            console.log(data);
        }).fail(function(){
            console.log('fail!!!');
        });
    });


    var itemSubmitButton = $("#item_form_submit");

    itemSubmitButton.on("click", function(event){
        event.preventDefault();
        
        $.ajax({
            url: location.href,
            method: "POST",
            data: $("form#todo-item-form").serialize(),
        }).done(function(data){
            console.log(data);
        }).fail(function(){
            console.log('fail!');
        });
    });


    // var getListsFromServer = function(){
    //     $.ajax({
    //         url:'/todo_lists/poll',
    //         method: 'GET'
    //     }).done(function(data){
    //         var formElement = document.getElementById("todo_list_field");
    //         formElement.value = '';

    //         var toDoList = document.getElementById("todo-list");
    //         toDoList.innerHTML = data;

    //         // console.log(data);
    //     });
    // };

    // setInterval(getListsFromServer, 500);



});

