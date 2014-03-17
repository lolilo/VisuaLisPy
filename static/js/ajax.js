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
            console.log(typeof(data));
            console.log(data);
        }).fail(function(){
            console.log('fail!!!');
        });

    });
});


        // $.ajax({
        //     url: "/",
        //     method: "POST",
        //     data: {
        //         list_name: "List Name"
        //     },

        // }).done(function(data){
        //     alert(data);
        // }).fail(function(){
        //     alert('fail!!!');
        // });



// $.ajax({
//      type: "GET",
//      url: filename,
//      async: false,
//      beforeSend: function(x) {
//       if(x &amp;&amp; x.overrideMimeType) {
//        x.overrideMimeType("application/j-son;charset=UTF-8");
//       }
//  },
//  dataType: "json",
//  success: function(data){
//     //do your stuff with the JSON data
//  }
// });





