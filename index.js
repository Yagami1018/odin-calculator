const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
const clearAll = document.getElementById('clearAll');
const errMsgs = document.getElementById('errMessages');
let isCalcResult = false;

const displayInput = value => {
    if (isCalcResult) {
        display.value = value;
        isCalcResult = false;
    } else if (String(display.value).includes('.')) {
        display.value += value;
    } else if (display.value == 0) {
        display.value = value;
    } else {
        display.value += value;
    }
};
const calculate = () => {
    let value = String(display.value);
    let indexOfOperator = value.search(/[+\-/*]/);
    let beforeOperator = value.slice(0, indexOfOperator);
    const size = value.length;
    if (indexOfOperator == 0) {
        value = value.slice(1);
        indexOfOperator = value.search(/[+\-/*]/);
        beforeOperator = -Number(value.slice(0, indexOfOperator));
    }
    console.log(indexOfOperator);

    const operator = value.charAt(indexOfOperator);
    console.log(beforeOperator);

    const afterOperator = value.slice(indexOfOperator + 1, size + 1);
    switch (operator) {
        case '+':
            display.value = Number(beforeOperator) + Number(afterOperator);
            break;
        case '-':
            display.value = Number(beforeOperator) - Number(afterOperator);
            break;
        case '*':
            display.value = Number(beforeOperator) * Number(afterOperator);
            break;
        case '/':
            if (Number(afterOperator) == 0) {
                display.value = 0;
                errMsgs.textContent = 'Error: Division by 0 not possible';
            } else {
                const result = Number(beforeOperator) / Number(afterOperator);
                display.value = Number.isInteger(result) ? result : result.toFixed(2);
            }
    }
};
const backspace = () => {
    if (String(display.value).length > 1) {
        display.value = String(display.value).slice(0, -1);
    } else {
        display.value = 0;
    }
};
const handleDots = () => {
    const text = String(display.value);
    const indexOp = text.search(/[+\-/*]/);
    const currentNumber = indexOp === -1 ? text : text.slice(indexOp + 1);
    const len = currentNumber.length;
    console.log(len);

    if (currentNumber.length == 0) {
        display.value += 0;
    }
    if (!currentNumber.includes('.')) {
        display.value += '.';
    }
};
const handleOperators = btn => {
    const val = String(display.value);

    if (btn.value === '-' && val.match(/[+*\-/]$/)) {
        display.value += '-';
        return;
    }

    if (!val.match(/[+\-/*]/)) {
        display.value = (val === '0' ? '' : val) + btn.value;
    } else if (!String(display.value).match(/[+\-/*]$/)) {
        calculate();
        display.value += btn.value;
    }
};

buttons.forEach(btn =>
    btn.addEventListener('click', () => {
        errMsgs.textContent = '';
        if (Number.isInteger(Number.parseInt(btn.value))) {
            displayInput(btn.value);
        } else if (btn.value === 'CA') {
            display.value = 0;
        } else if (btn.value === 'X') {
            backspace();
        } else if (btn.value === '.') {
            handleDots();
        } else if (btn.value == '+' || btn.value == '-' || btn.value == '*' || btn.value == '/') {
            handleOperators(btn);
        } else if (btn.value == '=') {
            calculate();
            isCalcResult = true;
        }
    }),
);
