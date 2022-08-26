
function add(x, y) {
    return x + y;
}

function sub(x, y) {
    return x - y;
}

function mult(x, y) {
    return x * y;
}

function div(x, y) {
    return x / y;
}

const btn = document.querySelectorAll('.button');
btn.forEach(btn => {btn.addEventListener('click', (e) => {
    clickValue = e.target.id;
    convertNumber(clickValue);
    console.log(clickValue + ' click value');
    if (typeof clickValue == 'number') {
        controlNum += clickValue;
        if (controlNum == 0) {
            controlNum = '';
        }
        tally += clickValue;
        if (tally == 0) {
            tally = '';
        }
        maxChars(tally);
        if (maxChars(tally)) {
            display();
        }
    }
    operate();
    clear();
    console.log(firstNum + ' first num');
    console.log(controlNum + ' control num');
    console.log(tally + ' tally');
    console.log(sign + ' sign');
    console.log(equalToggle + ' equal toggle');
    console.log('***********');
    });
});

let tally = '';
let clickValue;
let firstNum;
let controlNum = '';
let sign;
let equalToggle = false;


function convertNumber() {
    switch (clickValue) {
        case 'zero':
            clickValue = 0;
            break;
        case 'one':
            clickValue = 1;
            break;
        case 'two':
            clickValue = 2;
            break;  
        case 'three':
            clickValue = 3;
            break;
        case 'four':
            clickValue = 4;
            break;  
        case 'five':
            clickValue = 5;
            break;
        case 'six':
            clickValue = 6;
            break; 
        case 'seven':
            clickValue = 7;
            break;
        case 'eight':
            clickValue = 8;
            break;  
        case 'nine':
            clickValue = 9;
            break;           
    }
}

function display() {
    const display = document.querySelector('.display');
    display.textContent = maxChars(tally);
}

function maxChars(value) {
    let str = value.toString().split('');
    if (str[0] == 0) {
        str.shift();
    }
    if (str.length > 14) {
        let twelve = str.slice(0, 14);
        let join = twelve.join('');
        return +join;
    };
    let join = str.join('');
    return +join;
}

function operate() {
    if (equalToggle == true && clickValue != 'equals') {
        if (typeof clickValue == 'number') {
            tally = '';
            controlNum = ''; 
            controlNum += clickValue;
            if (controlNum == 0) {
                controlNum = '';
            }
            tally += clickValue;
            if (tally == 0) {
                tally = '';
            }
            maxChars(tally);
            if (maxChars(tally)) {
                display();
            }
        }
        firstNum = '';
        equalToggle = false;
    }

    if (clickValue == 'plus' || clickValue == 'minus' || clickValue == 'multiply' || clickValue == 'divide' || clickValue == 'equals') {
        
        if (!tally) {
            sign = clickValue;
            return;
        }

        if (firstNum && clickValue != 'equals') {
            if (sign == 'plus') {
                tally = add(parseInt(firstNum), parseInt(tally));
            }
            if (sign == 'minus') {
                tally = sub(parseInt(firstNum), parseInt(tally));
            }
            if (sign == 'multiply') {
                tally = mult(parseInt(firstNum), parseInt(tally));
            }
            if (sign == 'divide') {
                tally = div(parseInt(firstNum), parseInt(tally));
            }
            display();
        }
        
        if (clickValue != 'equals') {
            firstNum = tally;
            controlNum = '';
            tally = '';
            sign = '';
            sign = clickValue;
        } else if (clickValue == 'equals') {
            equalToggle = true;
            if (sign == 'plus') {
                tally = add(parseInt(controlNum), parseInt(firstNum));
            }
            if (sign == 'minus') {
                tally = sub(parseInt(firstNum), parseInt(controlNum));
            }
            if (sign == 'multiply') {
                tally = mult(parseInt(controlNum), parseInt(firstNum));
            }
            if (sign == 'divide') {
                tally = div(parseInt(firstNum), parseInt(controlNum));
            }
            firstNum = tally;
            display();
        }
    }
}

function clear() {
    if (clickValue == 'clear') {
        tally = '';
        clickValue = '';
        firstNum = '';
        controlNum = '';
        sign = '';
        equalToggle = false;
        tally = '';
        display();
    }
}