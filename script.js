
const computes = document.querySelectorAll('.compute');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');

let displayValue = "";
let finalOperand = true;
// let total = 0;

clear.addEventListener('click', clearValue);
equal.addEventListener('click', computeValue);
computes.forEach(compute => {
    compute.addEventListener('click', storeNum);
});

// HELPER FUNCTIONS -----------------------------------------------------------------------------------------

function computeValue() {
    let arr = displayValue.split('');
}

function clearValue() {
    displayValue = "";
    updateDisplay();
    finalOperand = true;
}

function storeNum() {
    if(isNaN(this.textContent) && finalOperand === true) return;
    displayValue += this.textContent;
    updateDisplay();
    setFinalOperand(this.textContent);
}

function setFinalOperand(current) {
    isNaN(current) ? finalOperand = true : finalOperand = false;
}

function updateFinal(current) {
    if(isNaN(current)) {
        finalOperand = true;
    } else {
        finalOperand = false;
    }
}

function updateDisplay() {
    display.textContent = displayValue;
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