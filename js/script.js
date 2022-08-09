let bill       = document.querySelector('.inputs-container__bill-input');
let billNumber = parseInt(bill.value);

let people       = document.querySelector('.inputs-container__people-input');
let peopleNumber = parseInt(people.value);

let tipResult   = document.querySelector('.results__tip-value')
let totalResult = document.querySelector('.results__total-value')

let buttons = document.querySelectorAll('.btns__button');

let alert = document.querySelector('#alert');

let tipValue = 5;
buttons.forEach(element => {
    element.addEventListener('click', e => {
        // change styles of buttons
        removeActive();
        element.classList.add('btns__button--selected');

        tipValue = parseInt(e.target.innerText.slice( 0, -1 ));
        
        calculateTip();
    })
})

// if custom have data, remove styles buttons and set custom tip value
function removeActive() {
    buttons.forEach(element => {
        element.classList.remove('btns__button--selected');
    })
}

// update bill amount when bill input changes
bill.addEventListener('input', () => {
    billNumber = parseFloat(bill.value)
    calculateTip()
});

// update custom tip amount when custom tip input changes
let custom = document.querySelector('.btns__custom');
custom.addEventListener('click', () => {
    removeActive();
})

custom.addEventListener('input', () => {
    tipValue = parseInt(custom.value);
    isNaN(tipValue) ? tipValue = 5 : tipValue;
    calculateTip();
})

// update people amount when people input changes
people.addEventListener('input', () => {
    peopleNumber = parseFloat(people.value)

    if(peopleNumber === 0 || isNaN(peopleNumber)) {
        people.style.borderColor = 'rgb(164, 68, 68)';
        alert.classList.add('error')
    } else {
        alert.classList.remove('error')
        people.style.borderColor = 'hsl(189, 41%, 97%)';
        calculateTip()
    }
});

function calculateTip() {
    // calculate tip amount
    tipResult.innerText = ((billNumber * tipValue / 100) / peopleNumber).toFixed(2);
    
    // calculate total amount
    totalResult.innerText = (((billNumber * tipValue / 100) + billNumber) / peopleNumber).toFixed(2);
}

// reset button
let reset = document.querySelector('.result-container__reset');
reset.addEventListener('click', () => {
    bill.value = '';
    people.value = '';
    custom.value = '';
    tipResult.innerText = '0.00';
    totalResult.innerText = '0.00';
    buttons.forEach(element => {
        element.classList.remove('btns__button--selected');
    } )
    people.style.borderColor = 'hsl(189, 41%, 97%)';
    alert.classList.remove('error')
})