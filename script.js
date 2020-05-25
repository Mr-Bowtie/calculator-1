
const computes = document.querySelectorAll('.compute');
const display = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');

let displayValue = "";
let finalOperand = true;

clear.addEventListener('click', clearValue);
equal.addEventListener('click', computeValue2);
computes.forEach(compute => {
    compute.addEventListener('click', storeNum);
});

// HELPER FUNCTIONS -----------------------------------------------------------------------------------------

function computeValue() { // NEXT TASK
    let arr = displayValue.split(' ');
    let total = Number(arr.shift());
    while (arr.length) {
        let operator = arr.shift();
        let b = Number(arr.shift());
        total = operate(operator, total, b);
    }
    displayValue = total;
    updateDisplay();
    console.log(`total: ${total}`);
    console.log(`arr: ${arr}`);
}

function computeValue2() { //UGLY BUT WORKING WITH ORDER OF OPERATIONS
    let arr = displayValue.split(' ');
    let total = 0
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
    console.log(arr);
    total = Number(arr.shift());
    while (arr.length) {
        let operator = arr.shift();
        let b = Number(arr.shift());
        total = operate(operator, total, b);
    }
    displayValue = total;
    updateDisplay();
    console.log(`total: ${total}`);
    console.log(`arr: ${arr}`);
}

function clearValue() {
    displayValue = "";
    finalOperand = true;
    updateDisplay();
}

function storeNum() {
    if(isNaN(this.textContent)) {
        if (finalOperand === true) return;
        displayValue += ` ${this.textContent} `;
    } else {
        displayValue += this.textContent;
    }
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