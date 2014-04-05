function area(r){
    return 3.141592653 * (r * r);
}

function fact(n){
    if (n <= 1){
        return 1;
    }
    else {
        return n * fact(n - 1);
    };
}

function fib(n){
    if (n < 2){
        return n;
    }
    else {
        return fib(n - 1) + fib(n - 2);
    };
}

1 + 2 * 3 - 4 / 5 * (6 + 2)