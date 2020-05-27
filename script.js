
const computes = document.querySelectorAll('.compute');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const backspace = document.querySelector('.backspace');

let displayValue = "";
let trailingOperand = true;
let hasDecimal = false;

clear.addEventListener('click', clearValue);
backspace.addEventListener('click', deleteLast);
equal.addEventListener('click', computeValue);
computes.forEach(compute => {
    compute.addEventListener('click', storeNum);
});

// HELPER FUNCTIONS -----------------------------------------------------------------------------------------

function computeValue() { //UGLY BUT WORKING WITH ORDER OF OPERATIONS
    if (displayValue === '') return;
    let arr = displayValue.split(' '); // PRODUCES SILENT TYPEERROR IF ONLY ONE NUMBER THERE
    let total = 0;
    if (trailingOperand === true) arr.splice(arr.length - 2, 2);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '*' || arr[i] === '/') {
            let operator = arr[i];
            let a = Number(arr[i-1]);
            let b = Number(arr[i+1]);
            total = operate(operator, a, b);
            arr.splice(i-1, 3, total);
            i--;
        }
    }
    total = Number(arr.shift());
    while (arr.length) {
        let operator = arr.shift();
        let b = Number(arr.shift());
        total = operate(operator, total, b);
    }
    displayValue = total;
    updateDisplay();
    trailingOperand = false;
    hasDecimal = checkIfDecimal(total);
}

function clearValue() {
    displayValue = "";
    trailingOperand = true;
    hasDecimal = false;
    updateDisplay();
}

function storeNum() {
    if (isNaN(this.textContent) && this.textContent !== '.') {
        if (trailingOperand === true) return;
        displayValue += ` ${this.textContent} `;
        hasDecimal = false;
    } else if (this.textContent === '.' && hasDecimal === true) {
        return;
    } else {
        displayValue += this.textContent;
        if (this.textContent === '.') hasDecimal = true;
    }
    setTrailingOperand(this.textContent);
    updateDisplay();
}

function setTrailingOperand(current) {
    isNaN(current) && current !== '.' ? trailingOperand = true : trailingOperand = false;
}

function updateDisplay() {
    display.textContent = displayValue;
}

function checkIfDecimal(total) {
    total = total.toString();
    return total.split('').filter(char => char === '.').length ? true : false;
}

function deleteLast() {
    let arr = displayValue.split('');
    if (arr[arr.length - 1] === ' ') {
        arr.splice(arr.length - 3, 3);
    } else {
        arr.pop();
    }
    arr = arr.join('');
    displayValue = arr;
    updateDisplay();
}

// MATHS ------------------------------------------------------------------------------------------------------

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log('ERROR');
            return 'ERROR';
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0 ) return 'UNDEFINED';
    return a / b;
}