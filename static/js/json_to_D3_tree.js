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

var createTree = function(json){
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

    for (i in children){
      child_node = createNode(children[i]);
      new_node["children"].push(child_node);
    }

    // uncomment this to see all the individual objects in tree
    // console.log(new_node);
    return new_node;
    }
};

