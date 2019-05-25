const fs = require('fs');
const https = require('https');



function getAllUsers() {
    let users = [];
    let requestURI = 'https://reqres.in/api/users/';
    for (let i = 1; i < 11; i++) {
        https.get(requestURI + i, res => {
            res.on('data', data => {
                let user = JSON.parse(data).data;
                users.push({
                    'id': Math.random().toString(36).substr(2),
                    'name': `${user.first_name} ${user.last_name}`,
                    'avatar': `./images/${user.first_name}_${user.last_name}.jpg`,
                });
                https.get(user.avatar, res => {
                    let img = fs.createWriteStream(`db/images/${user.first_name}_${user.last_name}.jpg`);
                    res.pipe(img);
                });
            });
            res.on('end', () => {
                if (users.length === 10)
                    fs.writeFileSync('db/data.json', JSON.stringify(users));
            })
        }).on('error', err => {
            console.log(`Error ${err}`);
        });
    }
};

function mkdir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

function app() {
    mkdir(__dirname + '/db');
    mkdir(__dirname + '/db/images');
    getAllUsers();
}

app();