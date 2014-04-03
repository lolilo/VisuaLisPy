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
    
    if (json[i][0] == "stmt"){
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

  // return final tree
  return tree;
};

var createJSNode = function(args){
  console.log('\n\n\n');
  console.log("ARGS IS " + JSON.stringify(args, null, '\t'));
  console.log(args.length);

  var parent = args[1];
  var childArray = args.slice(2);
  if (args[0] == "function" || args[0] == "compound statement"){
    parent = args[0];
    if (parent == "compound statement"){
      // compound statement is followed by a list of lists
      childArray = args[1];
    }
  }
  
  s_parent = JSON.stringify(parent, null, '\t');
  console.log('parent is ', s_parent);


  console.log("MAKING NODE FOR PARENT " + parent);
  var new_node = {
    "name": parent,
    "children": []
  };

  console.log('child array is', JSON.stringify(childArray, null, '\t'));
  var i = 0; // iterator

  for (i=0; i<childArray.length; i++){
    console.log("creating child node for " + childArray[i]);
    child_node = createJSNode(childArray[i]);
    new_node["children"].push(child_node);
  }

  // uncomment this to see all the individual objects in tree
  // console.log(new_node);
  return new_node;
};