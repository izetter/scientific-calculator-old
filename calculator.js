
let calcWithOperator = false;
let clearEntry = false;
let ans = 0;
let justPressedEqual = false;

let base = 0;
let exponent = 0;
let awaitingExponent = false;
let awaitingRoot = false;


function insertnum(num) {
    if (justPressedEqual === true) {
        document.getElementById("backlog").value = "";
        justPressedEqual = false;
    }
    if (clearEntry === true) {
        CE();
        clearEntry = false;
    }
    document.getElementById("entry").value += num;
}

function insertoperator(operator) {
    if (justPressedEqual === true) {
        document.getElementById("backlog").value += operator;
        clearEntry = true;
        justPressedEqual = false;
    } else if (calcWithOperator === true) {
        document.getElementById("backlog").value += document.getElementById("entry").value;     // Take what's inside entry and append it to backlog.
        evaluar();      // Evaluate what's in the backlog and show the result in entry.
        document.getElementById("backlog").value += operator;       // Append the operator to the backlog. This operator HAS NOT YET DONE ANYTHING!, it's the operator for the next operation that will occur until either the equal sign or another operator are pressed.
        clearEntry = true;
    } else {
        document.getElementById("backlog").value = (document.getElementById("entry").value + operator);
        calcWithOperator = true;
        clearEntry = true;
    }
}

// naming it evaluate() doesn't work.
function evaluar() {
    let expression = document.getElementById("backlog").value;
    ans = eval(expression);
    document.getElementById("entry").value = ans;
    document.getElementById("backlog").value = ans;
}

function equalsign() {
    if (awaitingExponent === true) {
        exponent = document.getElementById("entry").value;
        x = Math.pow(base, exponent);
        document.getElementById("entry").value = x;
        document.getElementById("backlog").value = x;
        justPressedEqual = true;
        clearEntry = true;
        awaitingExponent = false;
    } 
    else if(awaitingRoot === true) {       // Remove this block
        exponent = document.getElementById("entry").value;      // root seems to be a reserved word.
        x = Math.pow(base, 1/exponent);
        document.getElementById("entry").value = x;
        document.getElementById("backlog").value = x;
        justPressedEqual = true;
        clearEntry = true;
        awaitingExponent = false;
    } 
    else {
        document.getElementById("backlog").value += document.getElementById("entry").value;
        let expression = document.getElementById("backlog").value;
        ans = eval(expression);
        document.getElementById("entry").value = ans;
        document.getElementById("backlog").value = ans;
        justPressedEqual = true;
        clearEntry = true;
    }
}

function nthPower() {
    base = document.getElementById("entry").value;
    clearEntry = true;
    awaitingExponent = true;
    // Next, user inputs a number and then presses equal sign (see equalsign() function)
}

// THIS METHOD TO CALCULATE ROOTS IS ANALYTICALLY EXACT, BUT NOT NUMERICALLY!!! BUGGY BEHAVIOR EXPECTED AFTER USE TOO!!
function nthRoot() {
    base = document.getElementById("entry").value;
    clearEntry = true;
    awaitingRoot = true;
    // Next, user inputs a number and then presses equal sign (see equalsign() function)
}

function CE() {
    document.getElementById("entry").value = "";
}

// naming it clear() doesn't work: https://stackoverflow.com/q/7165570
function clearAll() {
    document.getElementById("backlog").value = "";
    document.getElementById("answer").value = "";
    document.getElementById("entry").value = "";
    calcWithOperator = false;
    clearEntry = false;
    ans = 0;
    justPressedEqual = false;
    base = 0;
    exponent = 0;
    awaitingExponent = false;
    awaitingRoot = false;
}

// delete is a reserved word.
function del() {
    let expression = document.getElementById("entry").value;
    document.getElementById("entry").value = expression.substring(0,(expression.length -1));
}



// CALCULATOR FUNCTIONS

function squareroot() {
    let x = document.getElementById("entry").value;
    let res = Math.sqrt(x);
    document.getElementById("entry").value = res;
    clearEntry = true;
}

function cuberoot() {
    let x = document.getElementById("entry").value;
    let res = Math.cbrt(x);
    document.getElementById("entry").value = res;
    clearEntry = true;
}

function factorial() {
    let k = document.getElementById("entry").value;    // parseFloat is not requiered here
    if (k % 1 === 0) {
        x = k;
        for (let i = 1; i < k; i++) {
            x = x*(k-i);
        }
        document.getElementById("entry").value = x;
    } else {
        document.getElementById("entry").value = "Math ERROR";
    }
    clearEntry = true;
}

function summation() {      // For an analytic slution see: https://math.stackexchange.com/a/60580
    let k = parseFloat(document.getElementById("entry").value);    // parseFloat is requiered here, because "+" concatenates, "*" seems to not care and "know" that I want to use numbers. parseInt won't work if there's validation for decimal numbers because it takes only the integer part (numbers before the decimal point). Interestingly, unary plus " + " will work!
    if (k % 1 === 0) {
        x = k;
        for (let i = 1; i < k; i++) {
            x = x+(k-i);
        }
        document.getElementById("entry").value = x;
    } else {
        document.getElementById("entry").value = "Math ERROR";

    }
    clearEntry = true;
}

function square() {
    let x = document.getElementById("entry").value;
    x *= x;
    document.getElementById("entry").value = x;
    clearEntry = true;
}

function cube() {
    let x = document.getElementById("entry").value;
    x *= x*x;
    document.getElementById("entry").value = x;
    clearEntry = true;
}

function euler() {
    let x = document.getElementById("entry").value;
    let res = Math.exp(x);
    document.getElementById("entry").value = res;
    clearEntry = true;
}

function ln() {
    let x = document.getElementById("entry").value;
    let res = Math.log(x);
    document.getElementById("entry").value = res;
    clearEntry = true;
}

function log() {
    let x = document.getElementById("entry").value;
    let res = Math.log10(x);
    document.getElementById("entry").value = res;
    clearEntry = true;
}

function inverse() {
    let x = document.getElementById("entry").value;
    let res = 1/x;
    document.getElementById("entry").value = res;
    clearEntry = true;
}