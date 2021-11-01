function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

function power(a, b){
    return a**b;
}

function operate(operator, a, b){
    switch (operator){
        case '+':
            return add(a,b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        case '^':
            return power(a, b);
            break;
    }
}

let currentOpperationDisplay = document.getElementById("curr");
let prevOpperationDisplay = document.getElementById("prev");
let allOpperations = ['/', '*', '-', '+', '%', '^'];
let selectedOpp = ''; 
let firstOpperand, secondOpperand;

window.addEventListener('keydown', checkKey);
let keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('click', check));

let opperating = false;

function check(e){
    let pressedKey = e.target.id;
    console.log (pressedKey);

    if(opperating){
        if(pressedKey == 'ac')
        {
            currentOpperationDisplay.innerText = '';
            prevOpperationDisplay.innerText = '';
            selectedOpp = '';
            
        }
        else if(pressedKey == 'c')
        {
            let str = currentOpperationDisplay.innerText;
            str = str.substring(0, str.length-1);
            currentOpperationDisplay.innerText = str;
        }
        else if(pressedKey == '=')
        {
            prevOpperationDisplay.innerText += pressedKey;
            console.log(prevOpperationDisplay.innerText);
            currentOpperationDisplay.innerText = operate(selectedOpp, +firstOpperand, +secondOpperand);
        }
        else {
            currentOpperationDisplay.innerText += pressedKey;
            prevOpperationDisplay.innerText += pressedKey;
            secondOpperand=pressedKey;
            console.log(firstOpperand, selectedOpp, secondOpperand);
        }
    }

    if(!opperating)
    {
        if (allOpperations.includes(pressedKey)){
            firstOpperand = currentOpperationDisplay.innerText;
            selectedOpp = pressedKey;
            prevOpperationDisplay.innerText = (firstOpperand + selectedOpp);
            currentOpperationDisplay.innerText = "";
            opperating = true;
        } 
        else if(pressedKey == 'ac')
        {
            currentOpperationDisplay.innerText = '';
            prevOpperationDisplay.innerText = '';
            firstOpperand = null;
            secondOpperand = null;
            selectedOpp = '';
        }
        else if(pressedKey == 'c')
        {
            let str = currentOpperationDisplay.innerText;
            str = str.substring(0, str.length-1);
            currentOpperationDisplay.innerText = str;
        }
        else {
            currentOpperationDisplay.innerText += pressedKey;
        }
    }
}

function readSecondOpperand(e){
    return e.target.id;
}

function checkKey(e){
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    let pressedKey = e.target.id;
}

