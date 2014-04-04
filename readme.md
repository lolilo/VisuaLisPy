lispy_web
=========

For the user input of defining a fibonnaci function, 

     (define fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))

the interpreter will output a JSON object in the following format.

     {
          "code": [
               "(define fib (lambda (n) (if (< n 2) n (+ (fib (- n 1)) (fib (- n 2))))))"
          ], 
          "trace": [
               {
                    "global_env": {
                         "equal?": "<built-in function eq>", 
                         "list?": "<function <lambda> at 0x15dc050>", 
                         "cons": "<function <lambda> at 0x15d6de8>", 
                         ">=": "<built-in function ge>", 
                         "<=": "<built-in function le>", 
                         "cdr": "<function <lambda> at 0x15d6ed8>", 
                         "append": "<built-in function add>", 
                         "null?": "<function <lambda> at 0x15dc0c8>", 
                         "+": "<function add at 0x15d6c08>", 
                         "*": "<function mul at 0x15d6cf8>", 
                         "-": "<function sub at 0x15d6c80>", 
                         "/": "<function div at 0x15d6d70>", 
                         "fib": "<function <lambda> at 0x7f63200de9b0>", 
                         "=": "<built-in function eq>", 
                         "<": "<built-in function lt>", 
                         ">": "<built-in function gt>", 
                         "not": "<built-in function not_>", 
                         "symbol?": "<function <lambda> at 0x15dc140>", 
                         "eq?": "<built-in function is_>", 
                         "car": "<function <lambda> at 0x15d6e60>", 
                         "list": "<function <lambda> at 0x15d6f50>", 
                         "length": "<built-in function len>", 
                    }
               }, 
               {
                    "expression_trace": [
                         {
                              "define": [
                                   "define", 
                                   "fib", 
                                   [
                                        "lambda", 
                                        [
                                             "n"
                                        ], 
                                        [
                                             "if", 
                                             [
                                                  "<", 
                                                  "n", 
                                                  2
                                             ], 
                                             "n", 
                                             [
                                                  "+", 
                                                  [
                                                       "fib", 
                                                       [
                                                            "-", 
                                                            "n", 
                                                            1
                                                       ]
                                                  ], 
                                                  [
                                                       "fib", 
                                                       [
                                                            "-", 
                                                            "n", 
                                                            2
                                                       ]
                                                  ]
                                             ]
                                        ]
                                   ]
                              ]
                         }
                    ]
               }
          ]
     }

Whereas Scheme's grammar is straightforward enough to map input to output with little modification, JavaScript is more complex. I used regular expressions to outline JavaScript tokenizing rules and [PLY (Python Lex-Yacc)](http://www.dabeaz.com/ply/) to generate a lexer and parser. 


Known bugs -- 
<br /> Backend
<br /> ~ (n - 1) must have spaces, else reads as '-1'. Must edit tokenizing rules and establish precedence for subtraction over negative numbers.
<br /> ~ if-then-else statement must end with semicolon (shouldn't be necessary)

Frontend
<br /> ~ 


To do -- 
Backend
<br /> ~ parse lists, loops. id followed by square brackets (indexing) will have higher precedence than list data type
Database
<br /> ~ migrate database to PostgreSQL
<br /> ~ ability for user to save code into database and share via generated link

Frontend
~ drop-down menus for examples

add-ons -- 
compile to C
visualize environment