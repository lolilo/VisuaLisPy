# Scheme interpreter written in Python
""" program --> Parser --> representation --> Execution --> output """

"""          Symbol, Env classes           """

import json

class Env(dict):
    # Env is a subclass of dict.
    # An environment is a dictionary of {'var': val} pairs with an outer Env.
    def __init__(self, parms=(), args=(), outer=None):
        self.update(zip(parms, args))
        self.outer = outer
    def find(self, var):
        # Find the innermost Env where var appears.
        # Env.find finds the right environment according to lexical scoping rules.

        # return self if var in self else self.outer.find(var)
        if var in self:
            return self
        else: 
            return self.outer.find(var)

def add_globals(env):
    # Add Scheme standard procedures to an environment. This is only called once at the start of the program.
    import operator as op
    import arithmetic as art

    env.update({
            # art file allows for *args
            '+' : art.add, 
            '-' : art.sub, 
            '*' : art.mul, 
            '/' : art.div, 
            'not' : op.not_,
            '>' : op.gt,
            '<' : op.lt,
            '>=' : op.ge,
            '<=' : op.le,
            '=' : op.eq,
            'equal?' : op.eq, # true if variable values are equal
            'eq?' : op.is_, # true if variables point to the same object in memory
            'length' : len,

            # Lambda forms (lambda expressions) have the same syntactic position as
            # expressions.  They are a shorthand to create anonymous functions; the
            # expression ``lambda arguments: expression`` yields a function object.

            'cons' : lambda x, y : [x] + y, # what the shit is this
            'car' : lambda x : x[0],
            'cdr' : lambda x : x[1:],
            'append' : op.add, # this works for Scheme, I guess? 
            # Well, Python concatenates strings this way...
            'list' : lambda *x : list(x),
            # list() -> new empty list
            # list(iterable) -> new list initialized from iterable's items
            # syntactic sugar. l = [] is the same as l = list()
            'list?' : lambda x : isa(x, list),
            'null?' : lambda x : x == [],
            'symbol?' : lambda x : isa(x, Symbol)    
        })
    return env

global_env = add_globals(Env())


"""          eval           """

# Evaluate an expression x in an environment env.
def eval(x, env=global_env):
    print """


    """
    
    # variable reference
    # if x is a str
    if isa(x, Symbol):
        print '%r is a Symbol ' % x,
        print 'that evaluates to %r' % env.find(x)[x]
        # .find is a method defined in the Env class
        # env.find locates the proper environment
        # the [x] returns the actual procedure/symbol definition
        return env.find(x)[x]
         
    # constant literal
    elif not isa(x, list):
        # print "%r is not a list; %r is of type %r" % (x, x, type(x))
        return x

    # (quote exp)
    elif x[0] == 'quote':
        print 'quote'
        (_, exp) = x # _ is a character we use as a variable.
        return exp

    # conditional (if test conseq alt)
    elif x[0] == 'if':
        (_, test, conseq, alt) = x
        print 'if %r then %r else %r' % (test, conseq, alt)

        if_statement = eval(test, env)
        if_eval = True if eval(test, env) else False

        print 'the if evaluates to %r, which is %r' % (if_statement, if_eval) 
        return eval((conseq if eval(test, env) else alt), env)
        # value_when_true if condition else value_when_false

    # assignment (set! var exp)
    elif x[0] == 'set!':
        (_, var, exp) = x
        env.find(var)[var] = eval(exp, env) # recursively eval the expression

    # (define var exp)
    elif x[0] == 'define':
        print x
        (_, var, exp) = x
        print 'define %r as %r' % (var, exp)
        env[var] = eval(exp, env) # adds var to the global environment dictionary

    # procedure (lambda (var*) exp)
    elif x[0] == 'lambda':
        print '%r is a lambda procedure' % x
        (_, vars, exp) = x
        print 'vars', vars
        print 'exp', exp
        return lambda *args: eval(exp, Env(parms=vars, args=args, outer=env))

    # sequencing (begin exp*)
    elif x[0] == 'begin':
        for exp in x[1:]:
            val = eval(exp, env)
        return val # val will keep being reassigned, so we only return the last val?

    else:
        print 'procedure call!'
        # procedure call (proc exp*)
        exps = [eval(exp, env) for exp in x] # list of evaluated exp
        proc = exps.pop(0) # procedure is the first element of exps, (* 9 9)
        
        # print proc([9, 8, 7]) # doesn't work
        # print proc(9, 8, 7)
        # # * turns a series of args into an iterable (list) as it passes into a function

        return proc(*exps) # arbitrary amount of exps, which will be recursively evaluated
        # final returned value is the final value...of course

# alias
isa = isinstance # isinstance(9, int) --> True, isinstance(9, str) --> False
Symbol = str

"""          parse, read, user interaction           """

# Parsing is traditionally separated into two parts: lexical analysis, 
# in which the input character string is broken up into a sequence of tokens, 
# and syntactic analysis, in which the tokens are assembled into an internal representation. 
# The Lispy tokens are parentheses, symbols (such as set! or x), and numbers (such as 2).

def parse(s):
    # read a Scheme expression from a string
    return read_from(tokenize(s))

def tokenize(s):
    # convert a string into a list of tokens
    # add white space in between parentheses and split on white space
    return s.replace('(', ' ( ').replace(')', ' ) ').split()

def read_from(tokens):
    # read an expression from a sequence of tokens
    print 'reading from tokens %r' % tokens
    if len(tokens) == 0:
        raise SyntaxError('unexpected EOF while reading')
    token = tokens.pop(0) # pop off first token and assign to token for analysis

    # need to save leading symbol for new node -- will use for expression_trace
    new_node_leading_symbol = tokens[0]

    if '(' == token:

        print '\n\nSTARTING A NEW NODE.'
        # each node has its own environment -- must account for this later in eval
        # could optimize this later to refer to later constructed nodes. Meh. 

        expression_tokens = []
        while tokens[0] != ')':
            expression_tokens.append(read_from(tokens))

        print 'popping off', tokens[0]
        tokens.pop(0) # pop off ')' Popping is faster than deleting. What. 

        # need to only append complete expression onto expression_trace
        # when tokens == [], complete expression has been traced
        # append to expression_trace
        if not tokens:
            new_node = {new_node_leading_symbol : expression_tokens}
            expression_trace.append(new_node)

        # print 'returning expression tokens %r' % expression_tokens
        # Holy shit, these are lists within lists. Awesome. 
        # It's the binary tree! :O 
        return expression_tokens

    # account for '()'
    elif ')' == token:
        raise SyntaxError('unexpected token )')

    else:
        return atom(token)

def atom(token):
    # numbers become numbers
    try:
        return int(token)
    except ValueError:
        try:
            return float(token)
        # every other token is a symbol
        except ValueError:
            return Symbol(token)

def to_string(exp):
    # convert Python object back into Lisp-readable string
    if isa(exp, list):
        # print 'to_string on a list %r' % exp
        return '(' + ' '.join(map(to_string, exp)) + ')'
    else:
        # print 'to_string on a non-list %r' % exp
        return str(exp) # called via the map function above. fancy. 3/12 - what was I talking about...
        # can simply write .join(map(str(exp), exp)) above? 

def repl():
    # prompt-read-eval-print loop

    while True:
        user_input = raw_input('lis.py > ')
        # able to push enter infinitely
        if user_input:
            return_json(user_input)

def return_json(user_input):

    # prepare tracing structures
    global expression_trace 
    expression_trace = []
    global_env_for_json_conversion = {}

    # list of lines of code
    user_input_clean = user_input.strip()
    user_input_lines = user_input_clean.split('\r\n')
    # do I care about unicode? It still works...but print statements are kind of ugly.

    # remove white space from each line
    for i in range(len(user_input_lines)):
        user_input_lines[i] = user_input_lines[i].strip()
    # print 'the lines!', user_input_lines

    # evaluate each line of code
    for line in user_input_lines:
        val = eval(parse(line))

    # for every entry in the global_env dictionary, convert it for JSON
    for i in global_env.iteritems():
        key = i[0]
        global_env_for_json_conversion[key] = str(global_env[key])

    # prepare JSON output object
    json_output = {
        # code is a list of user_input_lines as strings
        "code" : user_input_lines, 
        # trace is a list of dictionaries
        "trace" : []
        }
    
    json_output["trace"].append(dict(global_env=global_env_for_json_conversion))
    json_output["trace"].append(dict(expression_trace=expression_trace))
    json_object = json.dumps(json_output, indent=5)

    print to_string(val)
    # print json_object
    return json_object

def main():
    """In case we need this for something"""
    pass

if __name__ == "__main__":
    global expression_trace
    expression_trace = []

    # uncomment repl() for troubleshooting in the terminal
    # repl()

    # s = '(define area (lambda (r) (* 3.141592653 (* r r))))'
    # print return_json(s)
