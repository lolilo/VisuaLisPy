import ply.yacc as yacc
import ply.lex as lex
import js_tokens                 # JavaScript lexer
from js_tokens import tokens     # JavaScript tokens, needed for yacc.yacc()
import json

start = 'js'    # start symbol in our grammar

def p_js(p): 
        'js : element js'
        p[0] = [p[1]] + p[2]
def p_js_empty(p):
        'js : '
        p[0] = [ ]

######################################################################
# grammar rules
######################################################################

# function declaration
def p_element_function(p):
  'element : FUNCTION IDENTIFIER LPAREN optparams RPAREN compoundstmt'
  p[0] = ("function", p[2], p[4], p[6])

def p_element_stmt(p):
  'element : stmt SEMICOLON'
  p[0] = ("stmt", p[1])

def p_element_independent_stmt(p):
  'element : stmt'
  p[0] = ("stmt", p[1])

# def p_element_independent_exp(p):
#   'element : exp'
#   # will label as exp later
#   p[0] = p[1]

def p_optparams(p):
  'optparams : params'
  p[0] = p[1]

def p_optparams_empty(p):
  'optparams : '
  p[0] = []

def p_params(p):
  'params : IDENTIFIER COMMA params'
  p[0] = [p[1]] + p[3]

# one parameter, or last parameter
def p_params_one(p):
  'params : IDENTIFIER'
  p[0] = [p[1]]

def p_compound_stmt(p):
  'compoundstmt : LBRACE stmts RBRACE'
  p[0] = p[2]

def p_stmts_empty(p):
  'stmts : '
  p[0] = []

def p_stmts(p):
  'stmts : stmt SEMICOLON stmts'
  p[0] = [p[1]] + p[3]

def p_stmt_if(p):
  'stmt : IF exp compoundstmt'
  p[0] = ("if-then", p[2], p[3])

def p_stmt_if_else(p):
  'stmt : IF exp compoundstmt ELSE compoundstmt'
  p[0] = ("if-then-else", p[2], p[3], p[5])

def p_stmt_assignment(p):
  'stmt : IDENTIFIER EQUAL exp'
  p[0] = ("assign", p[1], p[3])

def p_stmt_return(p):
  'stmt : RETURN exp'
  p[0] = ("return", p[2])

def p_stmt_var(p):
  'stmt : VAR IDENTIFIER EQUAL exp'
  p[0] = ("var", p[2], p[4])

def p_stmt_exp(p):
  'stmt : exp'
  p[0] = ("exp", p[1])

# precedence populated in order of increasing precedence
precedence = (
    ('left', 'OROR'),
    ('left', 'ANDAND'),
    ('left', 'EQUALEQUAL'),
    ('left', 'LT', 'LE', 'GT', 'GE'),
    ('left', 'PLUS', 'MINUS'),
    ('left', 'TIMES', 'DIVIDE', 'MOD'),
    ('right', 'NOT')
) 

# rules for simple expressions
def p_exp_identifier(p): 
    'exp : IDENTIFIER'
    p[0] = ("identifier", p[1]) 
        
def p_exp_number(p):
    'exp : NUMBER'
    p[0] = ('number', p[1])

# TODO: define list. Here, or in lexer...? 
# def p_exp_list(p):
#     'exp : LBRACKET optparams RBRACKET'
#     p[0] = ('list', p[2])

def p_exp_string(p):
    'exp : STRING'
    p[0] = ('string', p[1])
    
def p_exp_true(p):
    'exp : TRUE'
    # first 'true' --> true boolean (type)
    p[0] = ('true','true')
    
def p_exp_false(p):
    'exp : FALSE'
    p[0] = ('false','false')
    
def p_exp_not(p):
    'exp : NOT exp'
    p[0] = ('not', p[2])
    
def p_exp_parens(p):
    'exp : LPAREN exp RPAREN'
    p[0] = p[2]

# binary operations defined with shorthand
def p_exp_binop(p):
    '''exp : exp PLUS exp
            | exp MINUS exp
            | exp TIMES exp
            | exp MOD exp
            | exp DIVIDE exp
            | exp EQUALEQUAL exp
            | exp LE exp
            | exp LT exp
            | exp GE exp
            | exp GT exp
            | exp ANDAND exp
            | exp OROR exp'''
    p[0] = ("binop", p[1], p[2], p[3])

# function calls
def p_exp_call(p):
    'exp : IDENTIFIER LPAREN optargs RPAREN'
    p[0] = ("call", p[1], p[3])

def p_optargs(p):
    'optargs : args'
    p[0] = p[1]

def p_optargs_empty(p):
    'optargs : '
    p[0] = []

def p_args(p):
    'args : exp COMMA args'
    p[0] = [p[1]] + p[3]

def p_args_one(p):
    'args : exp'
    p[0] = [p[1]]

def p_error(p):
    if p:
      print("JavaScript Parser: Illegal input {value} at ({lineno}, {lexpos})".format(value=p.value, lineno=p.lineno, lexpos=p.lexpos))
    else:
      print 'p is throwing an error. p is ', p
      print("JavaScript Parser Error")

######################################################################
# done
######################################################################

# # For now, we will assume that there is only one type of expression.
# def p_exp_identifier(p): 
#         'exp : IDENTIFIER'
#         p[0] = ("identifier",p[1]) 

# We have included a few tests. You will likely want to write your own.

jslexer = lex.lex(module=js_tokens) 
jsparser = yacc.yacc() 

def test_parser(input_string): 
        jslexer.input(input_string) 
        parse_tree = jsparser.parse(input_string,lexer=jslexer) 
        return parse_tree

jstree6 = [('stmt', ('exp', ('call', 'apply', [('number', 1.0), ('binop', ('number', 2.0), '+', ('call', 'eval', [('identifier', 'recursion')])), ('call', 'sqrt', [('number', 2.0)])])))]
json_object = json.dumps(jstree6, indent=5) # magic!
# print json_object

t = """function fib_no_recurse(n) {
    var i;
    var fib = [];
    fib[0] = 0;
    fib[1] = 1;
    
    for(i=2; i<=n; i++){
        new_fib = fib[0] + fib[1];
        fib[0] = fib[1];
        fib[1] = new_fib;
    }
    return fib[1];
}"""
t1 = """function fib(n) {
    if (n < 2) {
        return n;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    }
}"""
c = "function nobletruths(dukkha,samudaya,nirodha,gamini) { return buddhism ; }"
j_ob = json.dumps(test_parser(c), indent=5)
# print j_ob
jstext3 = """var view = right;
var intention = right;
var speech = right;
action = right;
livelihood = right;
effort_right;
mindfulness_right;
concentration_right;"""
jstree3 = [('stmt', ('var', 'view', ('identifier', 'right'))), ('stmt', ('var', 'intention', ('identifier', 'right'))), ('stmt', ('var', 'speech', ('identifier', 'right'))), ('stmt', ('assign', 'action', ('identifier', 'right'))), ('stmt', ('assign', 'livelihood', ('identifier', 'right'))), ('stmt', ('exp', ('identifier', 'effort_right'))), ('stmt', ('exp', ('identifier', 'mindfulness_right'))), ('stmt', ('exp', ('identifier', 'concentration_right')))]
print test_parser(jstext3) == jstree3