document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number-btn');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalButton = document.getElementById('equal');
    const clearButton = document.getElementById('clear');
    const backspaceButton = document.getElementById('backspace');
    const pointButton = document.getElementById('point');

    let currentInput = '0';
    let previousInput = '';
    let operation = null;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumberInput(number) {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operation !== null) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '0';
        operation = op;
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        switch (operation) {
            case '+': result = prev + current; break;
            case '-': result = prev - current; break;
            case '×': result = prev * current; break;
            case '÷': result = prev / current; break;
            case '%': result = prev % current; break;
        }
        currentInput = result.toString();
        operation = null;
        updateDisplay();
    }

    numberButtons.forEach(button => {
        button.addEventListener('click', () => handleNumberInput(button.textContent));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => handleOperator(button.textContent));
    });

    equalButton.addEventListener('click', calculate);

    clearButton.addEventListener('click', () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        updateDisplay();
    });

    backspaceButton.addEventListener('click', () => {
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
    });

    pointButton.addEventListener('click', () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    });

    updateDisplay();
});
