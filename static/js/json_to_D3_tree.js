var define =
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


var treeData = [
  {
    "name": "define",
    "children": [
      {
        "name": "area",
        "children": [
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
    ]
  }
];


// var tree = [
//   {
//     "name": "define",
//     "children": [
//       {
//         "name": "area",
//         "children": [
//           {
//             "name": "lambda",
//             "children": [
//               {
//                 "name": "r"
//               },
//               {
//                 "name": "*",
//                 "children": [
//                   {
//                     "name": "3.141592653",
//                   },
//                   {
//                     "name": "*",
//                     "children": [
//                       {
//                         "name": "r",
//                       },
//                       {
//                         "name": "r"
//                       }
//                     ]
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

console.log(JSON.stringify(treeData)==JSON.stringify(tree));
