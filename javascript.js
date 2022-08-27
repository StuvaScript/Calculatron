
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
    convertNumber();
    convertPeriod();
    console.log(clickValue + ' click value');
    if (typeof clickValue == 'number' || clickValue == '.') {
        controlNum += clickValue;
        if (controlNum == 0 && clickValue != '.') {
            controlNum = '';
        }
        tally += clickValue;
        if (tally == 0 && clickValue != '.') {
            tally = '';
        }
        display();
    }
    percent();
    posNeg();
    operate();
    clear();
    console.log(firstNum + ' first num');
    console.log(controlNum + ' control num');
    console.log(tally + ' tally');
    console.log(maxChars(tally) + ' max chars tally');
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

function convertPeriod() {
    if (clickValue == 'period') {
        clickValue = '.';
    }
}

function display() {
    const display = document.querySelector('.display');
    if (!maxChars(tally) && clickValue == '.') {
        display.textContent = '0.';
    } else if (maxChars(tally) && clickValue == '.') {
        display.textContent = maxChars(tally) + '.';
    } else if (maxChars(tally) && clickValue != '.') {
        display.textContent = maxChars(tally);
    }
    if (clickValue == 'clear') {
        clear();
    }
}

function maxChars(value) {
    let str = value.toString().split('');
    if (str[0] == 0 && clickValue != '.') {
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
                tally = add(+firstNum, +tally);
            }
            if (sign == 'minus') {
                tally = sub(+firstNum, +tally);
            }
            if (sign == 'multiply') {
                tally = mult(+firstNum, +tally);
            }
            if (sign == 'divide') {
                tally = div(+firstNum, +tally);
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
                tally = add(+controlNum, +firstNum);
            }
            if (sign == 'minus') {
                tally = sub(+firstNum, +controlNum);
            }
            if (sign == 'multiply') {
                tally = mult(+controlNum, +firstNum);
            }
            if (sign == 'divide') {
                tally = div(+firstNum, +controlNum);
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
        display();
    }
}

function posNeg() {
    if (clickValue == 'pos-neg') {
        tally = tally * (-1);
        controlNum = controlNum * (-1);
        display();
    }
}

function percent() {
    if (clickValue == 'percent') {
        tally = tally * 0.01;
        controlNum = controlNum * 0.01;
        display();
    }
}
//Currently trying to figure out why "clear" is not clearing the screen. The last thing I messed with that fudged it up was messing around with the conditionals in the display() function.


// When you hit equals followed by any number, everything resets to start a new equation. But when you hit equals followed by a zero, nothing happens. Fix this.

//Larger numbers get converted into exponents and then fudge up whats displayed on the screen. Fix this.