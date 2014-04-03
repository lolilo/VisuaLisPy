// takes in a JSON object and reformats object to comply with D3 tree format
var json =
    {
         "define": [
              "define",
              "area",
              [
                   "lambda",
                   [
                        "r"
                   ],
                   [
                      "*",
                      3.141592653,
                      [
                           "*",
                           "r",
                           "r"
                      ]
                   ]
              ]
         ]
    };

var createSchemeD3TreeFormat = function(json){
  var tree = [];
  // to start off, need to access the only key in the dictionary json
  for (var key in json){
    json_list = json[key];
    tree.push(createNode(json_list));
    }
  // return final tree
  return tree;
};

var createNode = function(args){
  if (typeof(args) != typeof([])){
    var terminal_node = {
      "name": args
    };
    return terminal_node;
  }

  else {
    var parent = args[0];
    var new_node = {
      "name": parent,
      "children": []
    };
    var children = args.slice(1);
    var i = 0; // iterator

    if (parent=="lambda"){
      var lambda_args = args[1]; // arguments list
      lambda_args.unshift("(args)"); // insert "(args)" node for tree rendering
    } // I'm revisiting this 2 weeks later...what is happening. Where does lambda_args get passed...

    for (i in children){
      child_node = createNode(children[i]);
      new_node["children"].push(child_node);
    }

    // uncomment this to see all the individual objects in tree
    // console.log(new_node);
    return new_node;
    }
};


var createJSD3TreeFormat = function(json){
  var tree = [];
  var i = 0; // iterator
  
  // initial elements will always be either statements or functions

  s_json = JSON.stringify(json, null, '\t');
  console.log('json passed for parsing is ' + s_json);

  for (i=0; i<json.length; i++){
    var block = json[i]; // block to parse
    console.log('block is now ' + JSON.stringify(block, null, '\t'));
    
    if (json[i][0] == "stmt" || json[i][0] == "FUNCTION"){
      console.log('editing block start point');
      block = json[i][1];

      if (block[0] == "exp"){
        console.log('editing block start point b/c it is exp');
        block = block[1];
      }
    }




    console.log('passing block into tree node ' + JSON.stringify(block, null, '\t'));
    tree.push(createJSNode(block));
  }




  // for (i; i < json.length; i++){
  //   console.log('IS THIS A FUNCTION BLOCK? ' + json[i][0]);
  //   if (json[i][0] == "function"){
  //     console.log('IS THIS A FUNCTION BLOCK? ' + json[i][0]);
  //     jsElement = json[i];
  //   }

  //   else {
  //     jsElement = json[i][0];
  //     console.log('json is ' + json_input);
  //     console.log('jsElement is ' + jsElement);

  //     if (jsElement=="stmt"){
  //       jsElement = json[i][1];
  //     }
  //     if (jsElement[0]=="exp"){
  //       jsElement = json[i][1][1];
  //     }
  //   }
  //   console.log('jsElement is now ' + JSON.stringify(jsElement, null, '\t'));
  //   json_list = jsElement;
  //   // console.log('json_list is ' + json_list);
  //   tree.push(createJSNode(json_list));
  // }



  // return final tree
  return tree;
};

var createJSNode = function(args){
  console.log('\n\n\n');
  console.log("ARGS IS " + JSON.stringify(args, null, '\t'));
  console.log(args.length);

  var parent = args[1];
  var childArray = args.slice(2);

  s_parent = JSON.stringify(parent, null, '\t');
  console.log('parent is ', s_parent);


  // while (typeof(parent) == typeof([])){
  //   parent = parent[0];
  //   nextChildArray = childArray;
  //   childArray = childArray[1]; // if we iterate again, this will be updated. 
    

  //   console.log('in while loop!');
  //   console.log('parent is ', JSON.stringify(parent, null, '\t'));
  //   console.log('childArray is ', JSON.stringify(childArray, null, '\t'));
  // }
  console.log("MAKING NODE FOR PARENT " + parent);
  var new_node = {
    "name": parent,
    "children": []
  };

  // while (typeof(childArray[0]) == typeof([]) && childArray.length==1){
  //   console.log('childArray is ', JSON.stringify(childArray, null, '\t'));
  //   childArray = childArray[0];
  //   console.log('childArray is now', JSON.stringify(childArray, null, '\t'));
  // }

  console.log('child array is', childArray);
  // var children = childArray.slice(1);
  // console.log('SLICING ' + JSON.stringify(children, null, '\t'));
  var i = 0; // iterator

  // if (parent=="lambda"){
  //   var lambda_args = args[1]; // arguments list
  //   lambda_args.unshift("(args)"); // insert "(args)" node for tree rendering
  // }

  for (i=0; i<childArray.length; i++){
    console.log("creating child node for " + childArray[i]);
    child_node = createJSNode(childArray[i]);
    new_node["children"].push(child_node);
  }

  // uncomment this to see all the individual objects in tree
  // console.log(new_node);
  return new_node;
};