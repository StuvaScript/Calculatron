
// Basic Math Operators

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

// function operate() // to be continued...

const btn = document.querySelectorAll('.button');
btn.forEach(btn => {btn.addEventListener('click', (e) => {
    clickValue = e.target.id;
    convertNumber(clickValue);
    console.log(clickValue + ' click value');
    if (typeof clickValue == 'number') {
        tally += clickValue;
        console.log(tally + ' tally')
        if (tally == 0) {
            tally = '';
        }
        maxChars(tally);
        console.log(maxChars(tally) + ' max')
        if (maxChars(tally)) {
            display();
        }
    }
    });
});

let tally = '';
let clickValue;


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
    console.log(str + ' str');
    if (str[0] == 0) {
        str.shift();
    }
    console.log(str + ' str after');
    if (str.length > 12) {
        let twelve = str.slice(0, 12);
        let join = twelve.join('');
        return parseInt(join);
    };
    let join = str.join('');
    return parseInt(join);
}
