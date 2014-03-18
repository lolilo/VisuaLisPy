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
  // to start off, need to access the only key in the dictionary
  for (var key in json){
    new_node = {
      "name": key,
      "children": []
    };
    
    expression_list = json[key];
    children = expression_list.slice(1);
    console.log(children);
    for (var child in children){
      new_node["children"].push(createNode(child));
    }
  }
  return tree;
};


var createNode = function(args){
  var parent = args[0];

  new_node = {
    "name": parent,
    "children": []
  };

  if (parent=="define"){
    var define = parent;
    var variable = args[1];
    var exp = args[2];

    var define_var = createNode(variable);
    var define_exp = createNode(exp);
  
    new_node["children"].push(define_var, define_exp);
  }

  // return final tree
  return new_node;
};


tree = createTree(json);


var treeData = [
  {
    "name": "define",
    // "parent": "null",
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


// console.log(JSON.stringify(treeData)==JSON.stringify(tree));
// oblivious to white space