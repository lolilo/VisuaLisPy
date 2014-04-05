VisuaLisPy
=========
 - Architecture
 - Getting Started
 - Scheme Interpreter
 - JavaScript Parser
 - Abstract Syntax Tree Visualization
 - Final Thoughts

Architecture
=========
 - database: PostgreSQL, SQLite
 - images: frontend screenshots
 - js_parser: JavaScript parser written in Python
 - scheme_interpreter: Scheme interpreter written in Python
 - static: CSS styles and JavaScript files
 - templates: HTML templates
 - tests: TDD files for JavaScript parser

Introduction
=========

I hold a certain aversion to black boxes, always wanting to open them up and take a peek inside. Since I began programming, I wanted to know how a computer understands these languages. Thus, I chose to build a compiler for the sake of learning some inner workings of language processing. However, I had my reservations. Hackbright instructor Liz said something quite accurate of me, “You really like the abstract, but you get frustrated if you can’t represent it visually.” How could I present my project in a visual format? And so, I set off to build VisuaLisPy -- a web-based language interpretation visualizer. I wrote an interpreter for Scheme (a dialect of Lisp) using Python. The interpreter file was modified to trace an input program's interpretation and output this trace data in JSON format. The JSON is then passed to the frontend and rendered visually as an abstract syntax tree in-browser with the aid of D3.js JavaScript library. Furthering my project, I added in a JavaScript parser and am currently working on code generators to compile Scheme into subsets of JavaScript and C. 

In line with my love for open education, I hope VisuaLisPy will be helpful for those who want to better understand computer language.

Backend: Python, Python Lex-Yacc, Regex, Flask, SQLAlchemy, PostgreSQL, Scheme, C
<br />Frontend: JavaScript, jQuery, Ajax, JSON, D3.js, HTML, CSS, Bootstrap



Getting Started
=========
From the commandline, after cloning and installing the requirements with

     pip install -r requirements.txt

run

     python controller.py

This should hopefully get the web app running locally on your machine. Database/examples may require extra setup.


Scheme Interpreter
=========

Working through [Peter Norvig's Lispy](http://norvig.com/lispy.html) was my starting-off point in understanding language interpretation. Once I had obtained a working knowledge, I edited Lispy to trace the interpreter's steps in parsing an input Scheme string. This trace is executed and return as a JSON object via the function [format_json](https://github.com/lolilo/lispy_web/blob/master/scheme_interpreter/lis.py#L240).

Lexing
------------------
The first step 

Parsing/Syntactic Analysis
------------------
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


JavaScript Parser
=========

Whereas Scheme's grammar is straightforward enough to map input to output with little modification, JavaScript is more complex. I used regular expressions to outline JavaScript tokenizing rules and [PLY (Python Lex-Yacc)](http://www.dabeaz.com/ply/) to generate a lexer and parser. 





Abstract Syntax Tree Visualization
=========

The frontend takes in JSON and renders the abstract syntax tree with the aid of the D3.js JavaScript library. Nodes representing procedures are colored green. 


Users are able to save their input code to VisuaLisPy's database and share this code via a given URL. 

![codeShare](https://raw.githubusercontent.com/lolilo/lispy_web/js_parse/images/codeShare.png)


Final Thoughts
------------------
Furthering my project, I wrote a simple code generator to compile Scheme into a subset of JavaScript. This was a relatively straight-forward process of translating the AST to fit the template of JavaScript's language structure. I plan to program a code generator to target C, which will involve type-casting and other presently unforeseen challenges, I'm sure. 


###To-do List

#####Known bugs
Backend
<br /> ~ (n - 1) must have spaces, else reads as '-1'. Must edit tokenizing rules and establish precedence for subtraction over negative numbers.
<br /> ~ if-then-else statement must end with semicolon (shouldn't be necessary)

Frontend
<br /> ~ 


#####Additional features
Backend
<br /> ~ parse lists, loops. id followed by square brackets (indexing) will have higher precedence than list data type
Database
<br /> ~ migrate database to PostgreSQL
<br /> ~ ability for user to save code into database and share via generated link

Frontend
<br /> ~ drop-down menus for examples
<br /> ~ visualize environment
<br /> ~ integrate codemirror

