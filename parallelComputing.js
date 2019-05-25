function parallelComputing(array, mainFunction) {
    for (let i = 0; i < array.length; i++)
        array[i]();
    mainFunction();
}

function ourCallback() { console.log('callback') };

function first(callback) {
    console.log('first');
    callback();
}

function second(callback) {
    console.log('second');
    callback();
}

function mainFunction() {
    console.log('mainFunction');
}

parallelComputing([first.bind(null, ourCallback), second.bind(null, ourCallback)], mainFunction);