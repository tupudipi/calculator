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

let keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('click', check));

window.addEventListener('keydown', checkKey);

function check(e){
    console.log(e.target.id)
}

function checkKey(e){
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    console.log(key.id);
}

