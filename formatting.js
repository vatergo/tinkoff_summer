function formatting(data) {
    let result = '';
    for (let i = 0; i < data.length; i++) {
        result += `Имя покупателя: ${data[i].name}\n`;
        result += `Номер карты: ${cardFormatting(data[i].cardNumber)}\n`;
        result += `Дата и время операции: ${dateFormatting(data[i].date)}\n`
        result += `Сумма операции: ${amountFormatting(data[i].amount, data[i].currency)}\n`;
        if (i + 1 !== data.length) result += '\n';
    }
    return result;
}

function cardFormatting(cardNumber) {
    return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(12)}`;
}

function dateFormatting(date) {
    let normalizedDate = new Date(date);
    let options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return `${normalizedDate.toLocaleString('ru', options).replace(',', '')}`;
}

function amountFormatting(amount, currency) {
    let normalizedAmount = parseFloat(amount);
    let options = {
        minimumFractionDigits: 2
    }
    return `${currency}${normalizedAmount.toLocaleString('ru', options).replace(',', '.').replace(' ', ',')}`;
}

console.log(formatting([
    {
        "name": "Ashlynn Hartmann",
        "cardNumber": "4929289137092267",
        "date": "2019-01-24T17:39:07.347Z",
        "amount": "579.63",
        "currency": "$"
    },
    {
        "name": "Philip Stoltenberg",
        "cardNumber": "4916258329158678",
        "date": "2018-09-07T02:21:03.144Z",
        "amount": "10472.99",
        "currency": "$"
    }
]));
