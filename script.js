
function add(a,b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            throw new Error("Invalid operator");
    }
}

// DOM caches
const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('button.number');
const operatorButtons = document.querySelectorAll('button.operator');
const clearButton = document.querySelector('button.clear');
const equalsButton = document.querySelector('button.equals');

let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetScreen = false;

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log('Button clicked:', button.textContent);
    if (shouldResetScreen) {
      display.value = '';
      shouldResetScreen = false;
    }
    display.value += button.textContent;
  });
});

clearButton.addEventListener('click', () => {
    display.value = '';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
    shouldResetScreen = false;
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentOperator === null) {
            firstOperand = parseFloat(display.value);
            currentOperator = button.textContent;
            shouldResetScreen = true;
        } else {
            secondOperand = parseFloat(display.value);
            try {
                const result = operate(currentOperator, firstOperand, secondOperand);
                display.value = result;
                firstOperand = result;
                currentOperator = button.textContent;
                shouldResetScreen = true;
            } catch (error) {
                display.value = "Error";
                firstOperand = null;
                currentOperator = null;
                shouldResetScreen = true;
            }
        }
    });
});