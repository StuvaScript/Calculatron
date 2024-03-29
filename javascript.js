// ---- GLOBAL VARIABLES ----

const btn = document.querySelectorAll(".button");
let clickValue;
let tally = "";
let firstNum;
let controlNum = "";
let sign;
let equalToggle = false;
let periodToggle = false;

// ---- EVENT LISTENERS ----

document.addEventListener("keydown", allActions);

btn.forEach((btn) =>
  btn.addEventListener("mousedown", () => {
    btn.style.cssText = "filter: brightness(0.50);";
  })
);

btn.forEach((btn) =>
  btn.addEventListener("mouseup", () => {
    btn.style.cssText = "filter: brightness(auto);";
  })
);

btn.forEach((btn) => {
  btn.addEventListener("click", allActions);
});

// ---- FUNCTIONS ----

function allActions(e) {
  if (e.type == "keydown") {
    keyStroke(e.key);
  } else if (e.type == "click") {
    clickValue = e.target.id;
  }

  convertNumber();
  convertPeriod();
  back(tally);
  if (typeof clickValue == "number" || clickValue == ".") {
    controlNum += clickValue;
    if (controlNum == 0) {
      controlNum = "";
    }
    tally += clickValue;
    if (tally == 0) {
      tally = "";
    }
    maxChars(tally);
    if (maxChars(tally)) {
      display();
    }
  }
  zeroDivide();
  percent();
  posNeg();
  operate();
  clear();
}

function keyStroke(value) {
  if (value >= 0 && value <= 9) {
    clickValue = +value;
  }
  switch (value) {
    case "Backspace":
      clickValue = "back";
      break;
    case "%":
      clickValue = "percent";
      break;
    case "/":
      clickValue = "divide";
      break;
    case "*":
      clickValue = "multiply";
      break;
    case "-":
      clickValue = "minus";
      break;
    case "+":
      clickValue = "plus";
      break;
    case "Enter":
      clickValue = "equals";
      break;
    case ".":
      clickValue = "period";
      break;
    case "Delete":
      clickValue = "clear";
      break;
  }
}

function convertNumber() {
  switch (clickValue) {
    case "zero":
      clickValue = 0;
      break;
    case "one":
      clickValue = 1;
      break;
    case "two":
      clickValue = 2;
      break;
    case "three":
      clickValue = 3;
      break;
    case "four":
      clickValue = 4;
      break;
    case "five":
      clickValue = 5;
      break;
    case "six":
      clickValue = 6;
      break;
    case "seven":
      clickValue = 7;
      break;
    case "eight":
      clickValue = 8;
      break;
    case "nine":
      clickValue = 9;
      break;
  }
}

function convertPeriod() {
  if (clickValue == "period" && periodToggle == false) {
    clickValue = ".";
    periodToggle = true;
  } else if (clickValue == "period" && periodToggle == true) {
    clickValue = "";
  }
}

function display() {
  const display = document.querySelector(".display");
  display.textContent = maxChars(tally);
}

function maxChars(value) {
  let str = value.toString().split("");
  if (str[0] == 0) {
    str.shift();
  }

  if (str.length > 13) {
    let thirteen = str.slice(0, 13);
    let join = thirteen.join("");
    return +join;
  }
  let join = str.join("");
  return +join;
}

function operate() {
  if (equalToggle == true && clickValue != "equals") {
    if (typeof clickValue == "number") {
      tally = "";
      controlNum = "";
      controlNum += clickValue;
      if (controlNum == 0) {
        controlNum = "";
      }
      tally += clickValue;
      if (tally == 0) {
        tally = "";
      }
      maxChars(tally);
      if (maxChars(tally)) {
        display();
      }
    }
    firstNum = "";
    equalToggle = false;
  }

  if (
    clickValue == "plus" ||
    clickValue == "minus" ||
    clickValue == "multiply" ||
    clickValue == "divide" ||
    clickValue == "equals"
  ) {
    if (!tally) {
      sign = clickValue;
      return;
    }

    periodToggle = false;

    if (firstNum && clickValue != "equals") {
      if (sign == "plus") {
        tally = add(+firstNum, +tally);
      }
      if (sign == "minus") {
        tally = sub(+firstNum, +tally);
      }
      if (sign == "multiply") {
        tally = mult(+firstNum, +tally);
      }
      if (sign == "divide") {
        tally = div(+firstNum, +tally);
      }
      display();
    }

    if (clickValue != "equals") {
      firstNum = tally;
      controlNum = "";
      tally = "";
      sign = "";
      sign = clickValue;
    } else if (clickValue == "equals") {
      equalToggle = true;
      if (sign == "plus") {
        tally = add(+controlNum, +firstNum);
      }
      if (sign == "minus") {
        tally = sub(+firstNum, +controlNum);
      }
      if (sign == "multiply") {
        tally = mult(+controlNum, +firstNum);
      }
      if (sign == "divide") {
        tally = div(+firstNum, +controlNum);
      }
      firstNum = tally;
      display();
    }
  }
}

function clear() {
  if (clickValue == "clear") {
    tally = "";
    clickValue = "";
    firstNum = "";
    controlNum = "";
    sign = "";
    equalToggle = false;
    periodToggle = false;
    display();
  }
}

function posNeg() {
  if (clickValue == "pos-neg") {
    tally = tally * -1;
    controlNum = controlNum * -1;
    display();
  }
}

function percent() {
  if (clickValue == "percent") {
    tally = tally * 0.01;
    controlNum = controlNum * 0.01;
    display();
  }
}

function back(value) {
  if (clickValue == "back") {
    let diff = value.toString().split("");
    diff.pop();
    tally = diff.join("");
    controlNum = diff.join("");
    display();
  }
}

function zeroDivide() {
  if (sign == "divide" && maxChars(tally) == 0 && clickValue == "equals") {
    const display = document.querySelector(".display");
    return (display.textContent = "The earth is shattered!");
  }
}

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
