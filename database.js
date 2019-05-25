const fs = require('fs');
const fetch = require('node-fetch');

let users = [];

async function getAllUsers() {
    let requestURI = 'https://reqres.in/api/users/';
    for (let i = 1; i < 11; i++) {
        const fetchedData = await fetch(requestURI + i);
        const data = await fetchedData.json();
        users.push({
            'id': Math.random().toString(36).substr(2),
            'name': `${data.data.first_name} ${data.data.last_name}`,
            'avatar': `./images/${data.data.first_name}_${data.data.last_name}.jpg`,
        });
        fetch(data.data.avatar)
            .then(res => {
                let img = fs.createWriteStream(`db/images/${data.data.first_name}_${data.data.last_name}.jpg`);
                res.body.pipe(img);
            })

    }
};

function mkdir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

async function app() {
    mkdir(__dirname + '/db');
    mkdir(__dirname + '/db/images');
    await getAllUsers();
    fs.writeFileSync('db/data.json', JSON.stringify(users));
}

app();