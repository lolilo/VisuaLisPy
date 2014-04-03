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
    }

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
  json_input = JSON.stringify(json, null, '\t');
  // console.log('json is ' + json_input);

  for (i; i < json.length; i++){
    console.log('IS THIS A FUNCTION BLOCK' + json[i][0]);
    if (json[i][0] == "function"){
      console.log('IS THIS A FUNCTION BLOCK' + json[i][0]);
      jsElement = json[i];
    }

    else {
      jsElement = json[i][0];
      console.log('json is ' + json_input);
      console.log('jsElement is ' + jsElement);

      if (jsElement=="stmt"){
        jsElement = json[i][1];
      }
      if (jsElement[0]=="exp"){
        jsElement = json[i][1][1];
      }
    }
    console.log('jsElement is now ' + jsElement);
    json_list = jsElement;
    console.log('json_list is ' + json_list);
    tree.push(createJSNode(json_list));
  }
  // return final tree
  return tree;
};

var createJSNode = function(args){
  console.log("ARGS IS " + args);
  console.log(args.length);

  var parent = args[1];
  var childArray = args;

  s_parent = JSON.stringify(parent, null, '\t');
  console.log('parent is ', s_parent);
  while (typeof(parent) == typeof([])){
    parent = parent[0];
    // nextChildArray = childArray;
    // childArray = childArray[1]; // if we iterate again, this will be updated. 
    console.log('childArray is ', JSON.stringify(childArray, null, '\t'));
  }
  console.log("MAKING NODE FOR PARENT " + parent);
  var new_node = {
    "name": parent,
    "children": []
  };


  var children = childArray.slice(2);
  console.log('SLICING ' + children);
  var i = 0; // iterator

  // if (parent=="lambda"){
  //   var lambda_args = args[1]; // arguments list
  //   lambda_args.unshift("(args)"); // insert "(args)" node for tree rendering
  // }

  for (i in children){
    child_node = createJSNode(children[i]);
    new_node["children"].push(child_node);
  }

  // uncomment this to see all the individual objects in tree
  // console.log(new_node);
  return new_node;
};