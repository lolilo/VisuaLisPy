import unittest
import sys
sys.path.append('..')
from js_parser import *

class TestListOperations(unittest.TestCase):

    # Simple function with no arguments and a one-statement body.
    def test_js1(self):
        self.jstext1 = "function myfun() { return nothing ; }"
        self.jstree1 = [('function', 'myfun', [], [('return', ('identifier', 'nothing'))])]
        self.assertEqual(test_parser(self.jstext1), self.jstree1)
    # Function with multiple arguments.
    def test_js2(self):
        self.jstext2 = "function nobletruths(dukkha,samudaya,nirodha,gamini) { return buddhism ; }"
        self.jstree2 = [('function', 'nobletruths', ['dukkha', 'samudaya', 'nirodha', 'gamini'], [('return', ('identifier', 'buddhism'))])]
        self.assertEqual(test_parser(self.jstext2), self.jstree2)
    # Multiple top-level elemeents, each of which is a var, assignment or
    # expression statement. 
    def test_js3(self):
        self.jstext3 = """var view = right;
            var intention = right;
            var speech = right;
            action = right;
            livelihood = right;
            effort_right;
            mindfulness_right;
            concentration_right;"""
        self.jstree3 = [('stmt', ('var', 'view', ('identifier', 'right'))), ('stmt', ('var', 'intention', ('identifier', 'right'))), ('stmt', ('var', 'speech', ('identifier', 'right'))), ('stmt', ('assign', 'action', ('identifier', 'right'))), ('stmt', ('assign', 'livelihood', ('identifier', 'right'))), ('stmt', ('exp', ('identifier', 'effort_right'))), ('stmt', ('exp', ('identifier', 'mindfulness_right'))), ('stmt', ('exp', ('identifier', 'concentration_right')))]
        self.assertEqual(test_parser(self.jstext3), self.jstree3)
    # if-then and if-then-else and compound statements.
    def test_js4(self):
        self.jstext4 = """
        if cherry {
          orchard;
          if uncle_vanya {
            anton ;
            chekov ;
          } else { 
          } ;
          nineteen_oh_four ;
        } ;
        """
        self.jstree4 = [('stmt', ('if-then', ('identifier', 'cherry'), [('exp', ('identifier', 'orchard')), ('if-then-else', ('identifier', 'uncle_vanya'), [('exp', ('identifier', 'anton')), ('exp', ('identifier', 'chekov'))], []), ('exp', ('identifier', 'nineteen_oh_four'))]))]
        self.assertEqual(test_parser(self.jstext4), self.jstree4)
    # Simple binary expression.
    def test_js5(self):
        self.jstext5 = "x + 1" 
        # can I differentiate from stmt and exp without filtering stmt first? 
        self.jstree5 = [('stmt', ('exp', ('binop', '+', ('identifier', 'x'), ('number', 1.0))))]
        self.assertEqual(test_parser(self.jstext5), self.jstree5)
    # Simple associativity.
    def test_js6(self):
        self.jstext6 = "1 - 2 - 3"   # (1-2)-3
        self.jstree6 = [('stmt', ('exp', ('binop', '-', ('binop', '-', ('number', 1.0), ('number', 2.0)), ('number', 3.0))))]
        self.assertEqual(test_parser(self.jstext6), self.jstree6) 
    # Precedence and associativity.
    def test_js7(self):
        self.jstext7 = "1 + 2 * 3 - 4 / 5 * (6 + 2)" 
        self.jstree7 = [('stmt', ('exp', ('binop', '-', ('binop', '+', ('number', 1.0), ('binop', '*', ('number', 2.0), ('number', 3.0))), ('binop', '*', ('binop', '/', ('number', 4.0), ('number', 5.0)), ('binop', '+', ('number', 6.0), ('number', 2.0))))))]
        self.assertEqual(test_parser(self.jstext7), self.jstree7) 

    # # nested function calls!
    # def test_js6(self):
    #     self.jstext6 = "apply(1, 2 + eval(recursion), sqrt(2))"
    #     self.jstree6 = [('stmt', ('exp', ('call', 'apply', [('number', 1.0), ('binop', '+', ('number', 2.0), ('call', 'eval', [('identifier', 'recursion')])), ('call', 'sqrt', [('number', 2.0)])])))]
    #     self.assertEqual(test_parser(self.jstext6), self.jstree6) 
    # # fibonacci
    # def test_js7(self):
    #     self.jstext7 = """function fib(n){
    #             if (n < 2){
    #                 return n;
    #             }
    #             else {
    #                 return fib(n - 1) + fib(n - 2);
    #             };
    #         }"""
    #     self.jstree7 = [('function', 'fib', ['n'], [('if-then-else', ('binop', '<', ('identifier', 'n'), ('number', 2.0)), [('return', ('identifier', 'n'))], [('return', ('binop', '+', ('call', 'fib', [('binop', '-', ('identifier', 'n'), ('number', 1.0))]), ('call', 'fib', [('binop', '-', ('identifier', 'n'), ('number', 2.0))])))])])]
        # self.assertEqual(test_parser(self.jstext7), self.jstree7)

# # String and boolean constants, comparisons.
# jstext4 = ' "hello" == "goodbye" || true && false '
# jstree4 = ('binop', ('binop', ('string', 'hello'), '==', ('string', 'goodbye')), '||', ('binop', ('true', 'true'), '&&', ('false', 'false')))
# print test_parser(jstext4) == jstree4
# print test_parser(jstext4)
# # Not, precedence, associativity.
# jstext5 = "! ! tricky || 3 < 5" 
# jstree5 = [('stmt', ('exp', ('binop', ('not', ('not', ('identifier', 'tricky'))), '||', ('binop', ('number', 3.0), '<', ('number', 5.0)))))]
# print test_parser(jstext5) == jstree5


if __name__ == '__main__':
    unittest.main()