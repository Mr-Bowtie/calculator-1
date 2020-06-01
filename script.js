
const computes = document.querySelectorAll('.compute');
const displayScreen = document.querySelector('.display');
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const backspace = document.querySelector('.backspace');

// MOST KEYPRESSES WORKING. ABLE TO FILTER INPUT USING IF STATEMENT.
// NEED TO FIX C, X, AND =

const buttons = Array.from(document.querySelectorAll('.button'));
const buttonCodes = buttons.map(button => {
    return button.textContent;
});

const display = {
    value: "",
    trailingOperand: true,
    hasDecimal: false
}

clear.addEventListener('click', clearValue);
backspace.addEventListener('click', deleteLast);
equal.addEventListener('click', computeValue);
computes.forEach(compute => {
    compute.addEventListener('click', storeNum);
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') deleteLast();
    if (buttonCodes.includes(e.key)) {
        if (e.key === 'c') {
            clearValue();
        } else if (e.key === '=') {
            computeValue();
        } else {
            storeNum(e);
        }
    }
});

// HELPER FUNCTIONS -----------------------------------------------------------------------------------------

function computeValue() { //UGLY BUT WORKING WITH ORDER OF OPERATIONS
    if (display.value === '') return;
    let arr = display.value.split(' '); // PRODUCES SILENT TYPEERROR IF ONLY ONE NUMBER THERE
    let total = 0;
    if (display.trailingOperand) arr.splice(arr.length - 2, 2);
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
    display.value = total;
    updateDisplay();
    display.trailingOperand = false;
    display.hasDecimal = checkIfDecimal(total);
}

function clearValue() {
    display.value = "";
    display.trailingOperand = true;
    display.hasDecimal = false;
    updateDisplay();
}

function storeNum(e) {
    let num = '';
    if (e.type === 'click') {
        num = e.target.textContent;
    } else {
        num = e.key;
    }
    if (display.value.length >= 23) return;
    if (isNaN(num) && num !== '.') {
        if (display.trailingOperand) return;
        display.value += ` ${num} `;
        display.hasDecimal = false;
    } else if (num === '.' && display.hasDecimal) {
        return;
    } else {
        display.value += num;
        if (num === '.') display.hasDecimal = true;
    }
    setTrailingOperand(num);
    updateDisplay();
}

function setTrailingOperand(current) {
    isNaN(current) && current !== '.' ? display.trailingOperand = true : display.trailingOperand = false;
}

function updateDisplay() {
    displayScreen.textContent = display.value;
}

function checkIfDecimal(total) {
    total = total.toString();
    return total.split('').filter(char => char === '.').length ? true : false;
}

function deleteLast() {
    let arr = display.value.split('');
    if (arr[arr.length - 1] === ' ') {
        arr.splice(arr.length - 3, 3);
    } else {
        arr.pop();
    }
    arr = arr.join('');
    display.value = arr;
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