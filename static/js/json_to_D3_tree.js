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

var mult =
                    {
                         "*": [
                              "*",
                              9,
                              9,
                              9,
                              9,
                              9
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
    // console.log('this is not a list', args);
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

    if (parent=="define"){
      var define = parent;
      var define_var = args[1];
      var define_exp = args[2];

      var define_var_node = createNode(define_var);
      var define_exp_node = createNode(define_exp);
    
      new_node["children"].push(define_var_node, define_exp_node);
    }

    else if (parent=="lambda"){
      var lambda = parent;
      var lambda_var = args[1][0];
      var lambda_exp = args[2];

      var lambda_var_node = createNode(lambda_var);
      var lambda_exp_node = createNode(lambda_exp);
      new_node["children"].push(lambda_var_node, lambda_exp_node);
    }

    else if (parent=="*"){
      // NEED TO HAVE THIS TAKE ARBITRARY AMOUNT OF ARGS
      var children = args.slice(1);
      // console.log('these are the children for *', children);
      for (var i in children){
        // console.log('this is a child', children[i]);
        child_node = createNode(children[i]);
        new_node["children"].push(child_node);
      }
      // console.log('new_node for *', new_node);
    }
    // uncomment this to see all the individual objects in tree
    // console.log(new_node);
    return new_node;
    }
};



var treeData = [
  {
    "name": "define",
    "children": [
      {
        "name": "area",
      },
      {
        "name": "lambda",
        "children": [
          {
            "name": "r"
          },
          {
            "name": "*",
            "children": [
              {
                "name": "3.141592653",
              },
              {
                "name": "*",
                "children": [
                  {
                    "name": "r",
                  },
                  {
                    "name": "r"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];


// var tree = [
//   {
//     "name": "define",
//     // "parent": "null",
//     "children": [
//       {
//         "name": "area",
//       },
//       {
//         "name": "lambda",
//         "children": [
//           {
//             "name": "r"
//           },
//           {
//             "name": "*",
//             "children": [
//               {
//                 "name": "3.141592653",
//               },
//               {
//                 "name": "*",
//                 "children": [
//                   {
//                     "name": "r",
//                   },
//                   {
//                     "name": "r"
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// ];

// var tree = createTree(mult);
// console.log('tree', tree);
// console.log('treeData', treeData);

// console.log(JSON.stringify(treeData)==JSON.stringify(tree));

// oblivious to white space












