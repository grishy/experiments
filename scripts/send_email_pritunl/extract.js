const p0 = require('./pages/0.json');
const p1 = require('./pages/1.json');
const p2 = require('./pages/2.json');
const p3 = require('./pages/3.json');
const p4 = require('./pages/4.json');
const p5 = require('./pages/5.json');
const p6 = require('./pages/6.json');

const users = [...p0.users, ...p1.users, ...p2.users, ...p3.users, ...p4.users, ...p5.users, ...p6.users]

let outURL = []

for (const u of users) {
    const email = u.email;
    const id = u.id;

    const url = `https://109.107.175.208/key/62f9394cf6b1c2974d51d06a/${id}`

    outURL.push({
        email,
        url,
    })
}


console.log(JSON.stringify(outURL));