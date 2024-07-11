#! /usr/bin/env node
import inquirer from "inquirer";
const currencyRates = {
    USD: 1, // base currency
    EUR: 0.91,
    GBP: 0.76,
    INR: 74.57,
    PKR: 278
};
async function promptUser() {
    const currencies = Object.keys(currencyRates);
    const { fromCurrency } = await inquirer.prompt({
        name: "fromCurrency",
        message: "Select From Currency",
        type: "list",
        choices: currencies.map(currency => ({ name: currency, value: currency }))
    });
    const { toCurrency } = await inquirer.prompt({
        name: "toCurrency",
        message: "Select To Currency",
        type: "list",
        choices: currencies
            .filter(currency => currency !== fromCurrency)
            .map(currency => ({ name: currency, value: currency }))
    });
    const { amount } = await inquirer.prompt({
        name: "amount",
        message: `Enter amount in ${fromCurrency}`,
        type: "input",
        validate: input => {
            const value = parseFloat(input);
            return !isNaN(value) && value > 0 ? true : 'Please enter a valid number';
        }
    });
    const convertedAmount = convertCurrency(parseFloat(amount), fromCurrency, toCurrency);
    console.log(`\n${amount} ${fromCurrency} is equal to ${convertedAmount.toFixed(2)} ${toCurrency}\n`);
}
function convertCurrency(amount, fromCurrency, toCurrency) {
    const rateFrom = currencyRates[fromCurrency];
    const rateTo = currencyRates[toCurrency];
    return (amount / rateFrom) * rateTo;
}
promptUser().catch(error => console.error(error));
