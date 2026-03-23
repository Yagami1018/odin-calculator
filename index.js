const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
const clearAll = document.getElementById('clearAll');

const displayInput = value => {
    console.log(display.value);
    console.log(value);

    if (display.value == 0) {
        display.value = value;
    } else {
        display.value += value;
    }
};

buttons.forEach(btn =>
    btn.addEventListener('click', () => {
        if (Number.isInteger(Number.parseInt(btn.value))) {
            displayInput(btn.value);
        } else if (btn.value === 'CA') {
            display.value = 0;
        } else if (btn.value === 'X') {
            if (String(display.value).length > 1) {
                display.value = String(display.value).slice(0, -1);
            } else {
                display.value = 0;
            }
        }
    }),
);
