
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) throw new Error('Cannot divide by zero.');
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: throw new Error('Invalid operator');
    }
}

// DOM caches
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const clearButton = document.querySelector('button.clear');
const equalsButton = document.querySelector('button.equals');

// Calculator state
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetScreen = false;

// Small DOM helpers
function setDisplay(val) { display.value = String(val); }
function getDisplayNumber() { return parseFloat(display.value); }

function activateOperator(button) {
    operatorButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function clearOperator() {
    operatorButtons.forEach(btn => btn.classList.remove('active'));
}

function handleNumberClick(button) {
    const digit = button.textContent;

    // If we just performed an operation, start fresh with the new digit
    if (shouldResetScreen) {
        setDisplay(digit);
        shouldResetScreen = false;
        return;
    }

    // Prevent multiple leading zeros
    if (display.value === '0' && digit === '0') return;

    // Replace leading zero, otherwise append
    if (display.value === '0') setDisplay(digit);
    else setDisplay(display.value + digit);
}

function handleEqualsClick() {
    if (currentOperator === null) return; 

    // If we just performed an operation, use the existing second operand
    secondOperand = shouldResetScreen ? secondOperand : getDisplayNumber();

    try {
        const result = operate(currentOperator, firstOperand, secondOperand);
        setDisplay(result);
        firstOperand = result;
        shouldResetScreen = true;
        clearOperator();
    } catch (err) {
        setDisplay('Error');
        firstOperand = null;
        shouldResetScreen = true;
        clearOperator();
    }
}

function handleOperatorClick(button) {
    const operator = button.textContent;

    // If no operator is pending, store the current display as first operand
    if (currentOperator === null || shouldResetScreen) {
        firstOperand = getDisplayNumber();
        currentOperator = operator;
        shouldResetScreen = true;
        activateOperator(button);
        return;
    }

    // If an operator was already selected and user picks another one, compute first
    handleEqualsClick();
    currentOperator = operator;
    activateOperator(button);
}

// Add event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => handleNumberClick(button));
});

equalsButton.addEventListener('click', () => handleEqualsClick());

operatorButtons.forEach(button => {
    button.addEventListener('click', () => handleOperatorClick(button));
});

function resetCalculator() {
    setDisplay('0');
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetScreen = false;
    clearOperator();
}

clearButton.addEventListener('click', resetCalculator);
