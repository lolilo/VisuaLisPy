function fib(n){
    if (n < 2){
        return n;
    }
    else {
        return fib(n-1) + fib(n-2);
    };
}

// memoize...kind of
function fib_no_recurse(n){
    var i;
    var fib = [];
    fib[0] = 0;
    fib[1] = 1;
    // only need to keep track of three numbers at any time
    
    for(i=2; i<=n; i++){
        new_fib = fib[0] + fib[1];
        fib[0] = fib[1];
        fib[1] = new_fib;
    }
    return fib[1];
}