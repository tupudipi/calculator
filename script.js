function operate(operator, a, b){
    switch (operator){
        case '+':
            return +(Math.round((a+b) + "e+2")  + "e-2");
        case '-':
            return +(Math.round((a-b) + "e+2")  + "e-2");
            break;
        case '*':
            return +(Math.round((a*b) + "e+2")  + "e-2");
            break;
        case '/':
            return +(Math.round((a/b) + "e+2")  + "e-2");
            break;
        case '^':
            return +(Math.round((a**b) + "e+2")  + "e-2");
            break;
    }
}

let displayCurrent = document.getElementById("curr");
let calculator = document.getElementById("calculator");
let displayPrevious = document.getElementById("prev");
let allOpperations = ['/', '*', '-', '+', '%', '^'];

window.addEventListener('keydown', checkKey);
let keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('click', checkClick));

function checkClick(e) {
    let pressedKey = e.target.id;
    calculate(pressedKey);
}

function checkKey(e){
    let key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    let pressedKey = key.id;
    calculate(pressedKey);
}

function calculate(x){
    let pressedKey = x;
    let displayedNum = displayCurrent.textContent;
    let previousKeyType = calculator.dataset.previousKeyType;

    if(allOpperations.includes(pressedKey)) {
        //console.log('operation: ' + pressedKey);
        
        const firstValue = calculator.dataset.firstOpperand;
        const operator = calculator.dataset.selectedOpp;
        const secondValue = displayedNum;

        if (   firstValue 
            && operator 
            && previousKeyType !== 'operator' 
            && previousKeyType !== 'resultPlease') 
        {
            const calcValue = operate(operator, +firstValue, +secondValue);
            displayCurrent.textContent = calcValue;
            calculator.dataset.firstOpperand = calcValue;
        } 
        else {
            calculator.dataset.firstOpperand = displayedNum;
        }

        displayPrevious.textContent = displayCurrent.textContent + pressedKey;
        calculator.dataset.selectedOpp = pressedKey;
        calculator.dataset.previousKeyType = 'operator';
    }
    else {
        switch(pressedKey){
            case '.':
                //console.log('decimal');
                if(!displayedNum.includes('.')){
                    displayCurrent.textContent = displayedNum + '.';
                }
                if (previousKeyType === 'operator' || previousKeyType === 'resultPlease') {
                    displayCurrent.textContent = '0.';
                }
                calculator.dataset.previousKeyType = 'decimal';
                break;

            case 'ac':
                //console.log('clear all');
                calculator.dataset.firstOpperand = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                displayCurrent.textContent = '0';
                displayPrevious.textContent = '';
                calculator.dataset.previousKeyType = 'clearAll';
                break;

            case 'c':
                //console.log('delete one');
                displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);
                calculator.dataset.previousKeyType = 'deleteOne';
                break;

            case '=':
                //console.log('result please');
                let firstOpperand = calculator.dataset.firstOpperand;
                let selectedOpp = calculator.dataset.selectedOpp;
                let secondOpperand = displayedNum;

                if(firstOpperand){
                    if(previousKeyType === 'resultPlease'){
                        firstOpperand = displayedNum;
                        secondOpperand = calculator.dataset.modValue;
                        displayPrevious.textContent = displayedNum + selectedOpp + secondOpperand + '=';
                    } else {
                        displayPrevious.textContent += secondOpperand + '=';
                    }
                    displayCurrent.textContent = operate(selectedOpp, +firstOpperand, +secondOpperand);
                }

                calculator.dataset.modValue = secondOpperand;
                calculator.dataset.previousKeyType = 'resultPlease'
                break;

            default:
                //console.log('number key: ' + pressedKey);
                if(displayedNum === '0' 
                || previousKeyType === 'operator' 
                || previousKeyType === 'resultPlease'){
                    displayCurrent.textContent = pressedKey;
                } else {
                    displayCurrent.textContent = displayedNum + pressedKey;
                }
                calculator.dataset.previousKeyType = 'number;'
                break;
        }
    }
}
    

