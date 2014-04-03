import unittest
import sys
sys.path.append('..')
from js_parser import *

class TestListOperations(unittest.TestCase):

    # def setUp(self):
        # self.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
        #                'Sep', 'Oct', 'Nov', 'Dec']
        # self.notes = ['Do', 'Re', 'Mi', 'Fa', 'So', 'La', 'Ti', 'Do']
        # self.multiples = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]
        


    # def test_1_A_head(self):
    #     self.assertEqual(head(self.months), 'Jan')
    #     self.assertEqual(head(self.notes), 'Do')
    #     self.assertEqual(head(self.multiples), 0)

    # def test_1_B_tail(self):
    #     self.assertEqual(tail(self.months), ['Feb', 'Mar', 'Apr', 'May', 'Jun',
    #                                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
    #                                          'Dec'])
    #     self.assertEqual(tail(self.notes), ['Re', 'Mi', 'Fa', 'So', 'La', 'Ti',
    #                                         'Do'])
    #     self.assertEqual(tail(self.multiples), [3, 6, 9, 12, 15, 18, 21, 24, 27])

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
        self.jstree5 = [('stmt', ('exp', ('binop', ('identifier', 'x'), '+', ('number', 1.0))))]
        self.assertEqual(test_parser(self.jstext5), self.jstree5)
    # nested function calls!
    def test_js6(self):
        self.jstext6 = "apply(1, 2 + eval(recursion), sqrt(2))"
        self.jstree6 = [('stmt', ('exp', ('call', 'apply', [('number', 1.0), ('binop', ('number', 2.0), '+', ('call', 'eval', [('identifier', 'recursion')])), ('call', 'sqrt', [('number', 2.0)])])))]
        self.assertEqual(test_parser(self.jstext6), self.jstree6) 


if __name__ == '__main__':
    unittest.main()