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




if __name__ == '__main__':
    unittest.main()