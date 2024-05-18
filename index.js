import inquirer from 'inquirer';
import fs from 'fs';
console.log('welcome to our atm');
let pinRead = fs.readFileSync('atmPin.txt', 'utf8');
let atmPin = parseInt(pinRead, 10);
let balanceRead = fs.readFileSync('balance.txt', 'utf8');
let balance = parseInt(balanceRead, 10);
let pinInput = await inquirer.prompt([
    {
        type: 'number',
        name: 'pin',
        message: 'please input your 4 digit pin',
    }
]);
let pin = pinInput.pin;
while (pin != atmPin) {
    console.log('your entered pin is wrong please enter pin again');
    let pinInput = await inquirer.prompt([
        {
            type: 'number',
            name: 'pin',
            message: 'please input your 4 digit pin',
        }
    ]);
    pin = pinInput.pin;
}
let cashWithdrawl = async () => {
    let amountWithdraw = await inquirer.prompt([
        {
            type: 'number',
            name: 'amount',
            message: 'please enter amount to withdraw',
        }
    ]);
    let amount = amountWithdraw.amount;
    if (amount > balance) {
        console.log('the amount entered is greater then balance, enter again');
        await cashWithdrawl();
    }
    else {
        balance -= amount;
        console.log('remaining amount is =', balance);
        fs.writeFileSync('balance.txt', balance.toString());
    }
};
let balanceIquirey = () => {
    console.log('your current balance is', balance);
};
let pinChange = async () => {
    let newPinInput = await inquirer.prompt([
        {
            type: 'number',
            name: 'pin',
            message: 'please input your new 4 digit pin',
        }
    ]);
    atmPin = newPinInput.pin;
    if (atmPin.toString().length != 4) {
        console.log('please enter 4 digit valid pin');
        pinChange();
    }
    else {
        fs.writeFileSync('atmPin.txt', atmPin.toString()); // Write the variable's value to a text file
        console.log('Your PIN has been changed successfully.');
    }
};
let Selection = async () => {
    let input = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'please select from the following option',
            choices: ['cash withdrawl', 'balance inquirey', 'pin change',]
        }
    ]);
    if (input.option == 'cash withdrawl') {
        console.log('enter amount is correct');
        await cashWithdrawl();
    }
    else if (input.option == 'balance inquirey') {
        balanceIquirey();
    }
    else if (input.option == 'pin change') {
        pinChange();
    }
};
await Selection();
let returnMenu = await inquirer.prompt([
    {
        type: 'list',
        name: 'optionMenu',
        message: 'Press `Y` to go to the main menu and `N` to exit:',
        choices: ['Y', 'N'],
    }
]);
let menu = returnMenu.optionMenu;
if (menu === 'Y') {
    while (menu === 'Y') {
        await Selection();
        let returnMenu = await inquirer.prompt([
            {
                type: 'list',
                name: 'optionMenu',
                message: 'Press `Y` to go to the main menu and `N` to exit:',
                choices: ['Y', 'N'],
            }
        ]);
        menu = returnMenu.optionMenu;
    }
}
else {
    console.log('Thank you for using this ATM.');
}
