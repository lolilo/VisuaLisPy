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

    var variable = 'x'; // just a placeholder
    var exp = [];

    // JavaScript weridness. Sigh. 
    // This is for arithmetic objects.
    var arithmetic_parents = ["+", "-", "*", "/"];
    var children = [];
    var i = 0; // iterator

    // if (parent=="define"){
    //   variable = args[1];
    //   exp = args[2];

    //   var define_var_node = createNode(variable);
    //   var define_exp_node = createNode(exp);
    
    //   new_node["children"].push(define_var_node, define_exp_node);
    // }

    // else if (parent=="lambda"){
    //   variable = args[1][0];
    //   exp = args[2];

    //   var lambda_var_node = createNode(variable);
    //   var lambda_exp_node = createNode(exp);
    //   new_node["children"].push(lambda_var_node, lambda_exp_node);
    // }

    // // (if test conseq alt)
    // // else if (parent=="if"){
    // //   var test = args[1];
    // //   var conseq = args[2];
    // //   var alt = args[3];

    // //   var test_node = createNode(test);
    // //   var conseq_node = createNode(conseq);
    // //   var alt_node = createNode(alt);
    // //   new_node["children"].push(test_node, conseq_node, alt_node);
    // // }

    // else if (arithmetic_parents.indexOf(parent) >= 0){
    //   // valid for arbitrary amount of args
    //   children = args.slice(1);
    //   // console.log('these are the children for *', children);
    //   for (i in children){
    //     child_node = createNode(children[i]);
    //     new_node["children"].push(child_node);
    //   }
    // }

    // this is a function that exists in the current environment
    // may or maybe not be user defined
    // else{
    children = args.slice(1);
    for (i in children){
      child_node = createNode(children[i]);
      new_node["children"].push(child_node);
    }
    // }

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












