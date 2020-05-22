
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

function computeValue() { // NEXT TASK
    let total = 0;
    let arr = displayValue.split('');
    let i = 0;
}

function clearValue() {
    displayValue = "";
    finalOperand = true;
    updateDisplay();
}

function storeNum() {
    if(isNaN(this.textContent) && finalOperand === true) return;
    displayValue += this.textContent;
    setFinalOperand(this.textContent);
    updateDisplay();
}

function setFinalOperand(current) {
    isNaN(current) ? finalOperand = true : finalOperand = false;
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