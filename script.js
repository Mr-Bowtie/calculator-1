
const computes = document.querySelectorAll('.compute');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');

let displayValue = "";
// let total = 0;

clear.addEventListener('click', clearValue);
computes.forEach(compute => {
    compute.addEventListener('click', storeNum);
});

// HELPER FUNCTIONS -----------------------------------------------------------------------------------------

function clearValue() {
    displayValue = "";
    updateDisplay();
}

function storeNum() {
    displayValue += `${this.textContent}`;
    updateDisplay();
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