import operator as op

def add(*args):
    ans = 0
    for arg in args:
        ans = op.add(ans, arg)
    return ans

def sub(*args):
    ans = args[0]
    for arg in args[1:]:
        ans = op.sub(ans, arg)
    return ans

def mul(*args):
    ans = 1
    for arg in args:
        ans = op.mul(ans, arg)
    return ans

def div(*args):
    ans = args[0]
    for arg in args[1:]:
        ans = op.div(ans, arg)
        print ans
    return ans

# print div(9, 9, 9.0)
