function justAddOne(array, number) {
    if (typeof number === 'number' && number > 0 && array.every(isCorrectNumber)) {
        let result = parseInt(array.join(''));
        result += number;
        result = result.toString().split('');
        return result.map(n => parseInt(n));
    }
    return null;
}

function isCorrectNumber(n) {
    if (typeof n === 'number' && n >= 0 && n < 10) return true;
    return false;
}

console.log(justAddOne([1, 0, 9], 2));
console.log(justAddOne([2, 5, 1], 5));
console.log(justAddOne([1], 4020));
console.log(justAddOne([1, '4', 11, null], 1));
console.log(justAddOne([1, '4'], 1));
console.log(justAddOne([1, 11], 1));
console.log(justAddOne([1, null], 1));